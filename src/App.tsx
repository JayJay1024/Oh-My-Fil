import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import bytes from 'bytes';


import './App.less';
import { Layout, Menu, Modal, Input, Card, Divider, Typography, Button, message } from "antd";
import { UserOutlined, ReloadOutlined } from '@ant-design/icons';

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


  const actorAddress = actorInfo.actorAddress;

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
  }

  const handleClickMinerBalance = () => {
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
    if (minerRecoveries.status === 'failed') {
      message.error(minerRecoveries.error);
    }
    if (actorState.status === 'failed') {
      message.error(actorState.error);
    }
    if (minerAvailableBalance.status === 'failed') {
      message.error(minerAvailableBalance.error);
    }
  }, [
    actorState,
    minerRecoveries,
    minerAvailableBalance,
  ]);

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
          <Menu.Item key='node'>{actorAddress.length ? <><UserOutlined />{actorAddress} ({bytes(actorInfo.actorSectorSize)})</> : <>Connect</> }</Menu.Item>
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
          hoverable={true} bordered={false} size='small' className='my-fil-home-card' loading={false}
        >
          {Object.keys(sectorsSummary).map((key: string) => {
            return <span key={key}>
              <Typography.Text>{key}: {sectorsSummary[key]}</Typography.Text><br/>
            </span>
          })}
        </Card>
        <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={handleClickMinerPower}>Miner Power</Button>}
          hoverable={true} bordered={false} size='small' className='my-fil-home-card' loading={false}
        >
          <span>Live - Active: {bytes((sectorCount.Live-sectorCount.Active)*actorInfo.actorSectorSize)}</span><br/>
          <span>Live   Power: {bytes(sectorCount.Live*actorInfo.actorSectorSize)}</span><br/>
          <span>Active Power: {bytes(sectorCount.Active*actorInfo.actorSectorSize)}</span><br/>
          <span>Faulty Power: {bytes(sectorCount.Faulty*actorInfo.actorSectorSize)}</span><br/>
          <span>Recoveries Power: {bytes(minerRecoveries.data[0]*actorInfo.actorSectorSize)}</span><br/>
        </Card>
        <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={handleClickMinerBalance}>Miner Balance</Button>}
          hoverable={true} bordered={false} size='small' className='my-fil-home-card' loading={actorState.status==='loading'||minerAvailableBalance.status==='loading'?true:false}
        >
          <span>Total: {nano2fil(actorState.data.Balance)} FIL</span><br/>
          <span>PreCommit: {nano2fil(actorState.data.State.PreCommitDeposits)} FIL</span><br/>
          <span>Pledge: {nano2fil(actorState.data.State.InitialPledge)} FIL</span><br/>
          <span>Vesting: {nano2fil(actorState.data.State.LockedFunds)} FIL</span><br/>
          <span>Available: {nano2fil(minerAvailableBalance.data)} FIL</span><br/>
        </Card>
      </Content>
      <Footer className='my-fil-footer'>
        My Fil ©2020 Created by Jay
      </Footer>
    </Layout>
  );
};

export default App;
