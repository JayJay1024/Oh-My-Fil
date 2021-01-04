import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import bytes from 'bytes';


import './App.less';
import { Layout, Menu, Modal, Input, Card, Divider, Button, Spin, message } from "antd";
import { UserOutlined, ReloadOutlined } from '@ant-design/icons';

import { taskShortName } from './utility';

import {
  updateLotusApi,
  updateMinerApi,
  updateLotusToken,
  updateMinerToken,
  selectConnectInfo,
} from './reducers/connectInfoSlice';
import { fetchActorInfo, selectActorInfo } from './reducers/actorInfoSlice';
import { fetchSectorsSummary, selectSectorsSummary } from './reducers/sectorsSummarySlice';
import { fetchSectorCount, selectSectorCount } from './reducers/sectorCountSlice';
import { fetchMinerRecoveries, selectMinerRecoveries } from './reducers/minerRecoveriesSlice';
import { fetchMinerAvailableBalance, selectMinerAvailableBalance } from './reducers/minerAvailableBalanceSlice';
import { fetchActorState, selectActorState } from './reducers/actorStateSlice';
import { fetchWorkerBalance, selectWorkerBalance, WorkerAddress } from './reducers/workerBalanceSlice';
import { fetchMinerInfo, selectMinerInfo } from './reducers/minerInfoSlice';
import { fetchActorPower, selectActorPower } from './reducers/actorPowerSlice';
import { fetchWorkerJobs, selectWorkerJobs } from './reducers/workerJobsSlice';

const { Header, Content, Footer } = Layout;

const nano2fil = (nanoString: string): string => {
  return (parseInt(nanoString.slice(0, -9))/(Math.pow(10, 9))).toFixed(3)
}

const App: FC = () => {
  const [visibleConnectInfoModal, setVisibleConnectInfoModal] = useState<boolean>(false);

  const dispatch = useDispatch()

  const connectInfo = useSelector(selectConnectInfo);
  const actorInfo = useSelector(selectActorInfo);
  const sectorsSummary = useSelector(selectSectorsSummary);
  const sectorCount = useSelector(selectSectorCount);
  const minerRecoveries = useSelector(selectMinerRecoveries);
  const minerAvailableBalance = useSelector(selectMinerAvailableBalance);
  const actorState = useSelector(selectActorState);
  const minerInfo = useSelector(selectMinerInfo);
  const workerBalance = useSelector(selectWorkerBalance);
  const actorPower = useSelector(selectActorPower);
  const workerJobs = useSelector(selectWorkerJobs);

  const actorAddress = actorInfo.data.actorAddress;

  const handleClickMenu = (e: any) => {
    console.log(e.key)
  }

  const handleClickNode = () => {
    if (actorAddress.length) { return; }  // connected
    setVisibleConnectInfoModal(true);
  }

  const handleClickMinerPower = () => {
    dispatch(fetchSectorCount({ connectInfo, actorAddress }));
    dispatch(fetchMinerRecoveries({ connectInfo, actorAddress }));
    dispatch(fetchActorPower({ connectInfo, actorAddress }));
  }

  const handleClickMinerBalance = () => {
    const actorAddress1 = {
      owner: minerInfo.data.Owner,
      worker: minerInfo.data.Worker,
      control: minerInfo.data.ControlAddresses[0],
    } as WorkerAddress;
    dispatch(fetchWorkerBalance({ connectInfo, actorAddress: actorAddress1}));

    dispatch(fetchActorState({ connectInfo, actorAddress }));
    dispatch(fetchMinerAvailableBalance({ connectInfo, actorAddress }));
  }

  const handleOKModalConnectInfo = () => {
    setVisibleConnectInfoModal(false);
    dispatch(fetchActorInfo(connectInfo));
  }

  const handleChangeLotusApi = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(updateLotusApi(e.target.value)); }
  const handleChangeMinerApi = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(updateMinerApi(e.target.value)); }
  const handleChangeLotusToken = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(updateLotusToken(e.target.value)); }
  const handleChangeMinerToken = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(updateMinerToken(e.target.value)); }

  useEffect(() => {
    dispatch(fetchMinerInfo({ connectInfo, actorAddress }));
  }, [connectInfo, actorAddress, dispatch]);

  useEffect(() => {
    if (minerRecoveries.status === 'failed') {
      message.error(minerRecoveries.error);
    }
    if (actorState.status === 'failed') {
      message.error(actorState.error);
    }
    if (minerAvailableBalance.status === 'failed') {
      message.error(minerAvailableBalance.error);
    }
    if (minerInfo.status === 'failed') {
      message.error(minerInfo.error);
    }
    if (workerBalance.status === 'failed') {
      message.error(workerBalance.error);
    }
  }, [
    actorState,
    minerInfo,
    minerRecoveries,
    minerAvailableBalance,
    workerBalance,
  ]);

  // Expected
  let winPerDay: number = 0;
  const qpercI = (parseInt(actorPower.data.MinerPower.QualityAdjPower) * 1000000) / parseInt(actorPower.data.TotalPower.QualityAdjPower);
  let expWinChance = qpercI * 5 / 1000000;
  if (expWinChance > 0) {
    if (expWinChance > 1) {
      expWinChance = 1;
    }
    const winRate = 1000000000 * 30 / expWinChance;
    winPerDay = 3600000000000 * 24 / winRate;
  }

  // Task count
  interface TaskCountState {
    [index: string]: number
  }
  let taskCount: TaskCountState = {};
  for (let wid in workerJobs.data) {
    const jobs = workerJobs.data[wid];

    for (let job of jobs) {
      let task = taskShortName(job.Task);
      if (task) {
        const count = taskCount[task] || 0;
        taskCount[task] = count + 1;
      }
    }
  }

  return (
    <Layout className='my-fil-layout'>
      <Header className='my-fil-header'>
        <Menu theme='light' mode='horizontal' onClick={handleClickMenu} defaultSelectedKeys={['home']}>
          <Menu.Item key='home'>Home</Menu.Item>
          <Menu.Item key='workers'>Workers</Menu.Item>
          <Menu.Item key='jobs'>Jobs</Menu.Item>
          <Menu.Item key='storages'>Storages</Menu.Item>
          <Menu.Item key='proving'>Proving</Menu.Item>
          <Menu.Item key='sectors'>Sectors</Menu.Item>
        </Menu>
        <Divider type='vertical' style={{ height: '60%' }} />
        <Divider type='vertical' style={{ height: '60%' }} />
        <Menu theme='light' mode='horizontal' onClick={handleClickNode}>
          <Menu.Item key='node'>{actorAddress.length ? <><UserOutlined />{actorAddress} ({bytes(actorInfo.data.actorSectorSize)})</> : <>Connect</> }</Menu.Item>
        </Menu>
      </Header>
      <Content className='my-fil-content'>
        <Modal closable={false} visible={visibleConnectInfoModal} title='Node Info' onOk={handleOKModalConnectInfo} onCancel={() => setVisibleConnectInfoModal(false)}>
          <Input allowClear={true} defaultValue={connectInfo.lotusApi} onChange={handleChangeLotusApi} className='my-fil-node-info-button' placeholder='lotus api like 127.0.0.1:1234' />
          <Input allowClear={true} defaultValue={connectInfo.minerApi} onChange={handleChangeMinerApi} className='my-fil-node-info-button' placeholder='miner api like 127.0.0.1:2345' />
          <Input allowClear={true} defaultValue={connectInfo.lotusToken} onChange={handleChangeLotusToken} className='my-fil-node-info-button' placeholder='lotus token' />
          <Input allowClear={true} defaultValue={connectInfo.minerToken} onChange={handleChangeMinerToken} className='my-fil-node-info-button' placeholder='miner token' />
        </Modal>
        <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={() => dispatch(fetchSectorsSummary(connectInfo))}>Sectors Summary</Button>}
          extra={sectorsSummary.status==='loading'?<Spin size='small' delay={200} />:''}
          hoverable={true} bordered={false} size='small' className='my-fil-home-card'
        >
          {Object.keys(sectorsSummary.data).map((key: string) => {
            return (
              <div className='my-fil-home-card-item' key={key}>
                <div>{key}:</div>
                <div>{sectorsSummary.data[key]}</div>
              </div>
            )
          })}
        </Card>
        <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={handleClickMinerPower}>Miner Power</Button>}
          extra={sectorCount.status==='loading'||minerRecoveries.status==='loading'?<Spin size='small' delay={200} />:''}
          hoverable={true} bordered={false} size='small' className='my-fil-home-card'
        >
          <Divider plain style={{ margin: '0px' }}>Power:</Divider>
          <div className='my-fil-home-card-item'>
            <div>Growth:</div>
            <div>{bytes((sectorCount.data.Live-sectorCount.data.Active)*actorInfo.data.actorSectorSize)}</div>
          </div>
          <div className='my-fil-home-card-item'>
            <div>Committed:</div>
            <div>{bytes(sectorCount.data.Live*actorInfo.data.actorSectorSize)}</div>
          </div>
          <div className='my-fil-home-card-item'>
            <div>Proving:</div>
            <div>{bytes(sectorCount.data.Active*actorInfo.data.actorSectorSize)}</div>
          </div>
          <div className='my-fil-home-card-item'>
            <div>Faulty:</div>
            <div>{bytes(sectorCount.data.Faulty*actorInfo.data.actorSectorSize)}</div>
          </div>
          <div className='my-fil-home-card-item'>
            <div>Recoveries:</div>
            <div>{bytes(minerRecoveries.data[0]*actorInfo.data.actorSectorSize)}</div>
          </div>
          <Divider plain style={{ margin: '0px' }}>Expected:</Divider>
          <div className='my-fil-home-card-item'>
            <div>Win Rate:</div>
            <div>{winPerDay.toFixed(4)}/day</div>
          </div>
        </Card>
        <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={handleClickMinerBalance}>Miner Balance</Button>}
          extra={actorState.status==='loading'||minerAvailableBalance.status==='loading'||workerBalance.status==='loading'?<Spin size='small' delay={200} />:''}
          hoverable={true} bordered={false} size='small' className='my-fil-home-card'
        >
          <Divider plain style={{ margin: '0px' }}>Miner Balance:</Divider>
          <div className='my-fil-home-card-item'>
            <div>Total:</div>
            <div>{nano2fil(actorState.data.Balance)} FIL</div>
          </div>
          <div className='my-fil-home-card-item'>
            <div>PreCommit:</div>
            <div>{nano2fil(actorState.data.State.PreCommitDeposits)} FIL</div>
          </div>
          <div className='my-fil-home-card-item'>
            <div>Pledge:</div>
            <div>{nano2fil(actorState.data.State.InitialPledge)} FIL</div>
          </div>
          <div className='my-fil-home-card-item'>
            <div>Vesting:</div>
            <div>{nano2fil(actorState.data.State.LockedFunds)} FIL</div>
          </div>
          <div className='my-fil-home-card-item'>
            <div>Available:</div>
            <div>{nano2fil(minerAvailableBalance.data)} FIL</div>
          </div>
          <Divider plain style={{ margin: '0px' }}>Worker Balance:</Divider>
          <div className='my-fil-home-card-item'>
            <div>Owner:</div>
            <div>{nano2fil(workerBalance.data.owner)} FIL</div>
          </div>
          <div className='my-fil-home-card-item'>
            <div>Worker:</div>
            <div>{nano2fil(workerBalance.data.worker)} FIL</div>
          </div>
          <div className='my-fil-home-card-item'>
            <div>Control:</div>
            <div>{nano2fil(workerBalance.data.control)} FIL</div>
          </div>
        </Card>
        <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={() => dispatch(fetchWorkerJobs(connectInfo))}>Tasks Count</Button>}
          extra={workerJobs.status==='loading'?<Spin size='small' delay={200} />:''}
          hoverable={true} bordered={false} size='small' className='my-fil-home-card'
        >
          {Object.keys(taskCount).map((key: string) => {
            return (
              <div className='my-fil-home-card-item' key={key}>
                <div>{key}:</div>
                <div>{taskCount[key]}</div>
              </div>
            )
          })}
        </Card>
      </Content>
      <Footer className='my-fil-footer'>
        My Fil ©2020 Created by Jay
      </Footer>
    </Layout>
  );
};

export default App;
