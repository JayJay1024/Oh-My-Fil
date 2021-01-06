import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Modal, Input, Divider, message } from "antd";

import './App.less';
import bytes from 'bytes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Companents
import Home from './companents/Home';
import Jobs from './companents/Jobs';
import Workers from './companents/Workers';
import Proving from './companents/Proving';
import Sectors from './companents/Sectors';
import Storage from './companents/Storage';

// Reducers
import {
  updateLotusApi,
  updateMinerApi,
  updateLotusToken,
  updateMinerToken,
  selectConnectInfo,
} from './reducers/connectInfoSlice';
import { fetchActorInfo, selectActorInfo } from './reducers/actorInfoSlice';
import { selectActorPower } from './reducers/actorPowerSlice';
import { selectActorState } from './reducers/actorStateSlice';
import { selectDeadlinesPartitions } from './reducers/deadlinesPartitionsSlice';
import { selectMinerAvailableBalance } from './reducers/minerAvailableBalanceSlice';
import { selectMinerDeadlines } from './reducers/minerDeadlinesSlice';
import { selectMinerFaults } from './reducers/minerFaultsSlice';
import { fetchMinerInfo, selectMinerInfo } from './reducers/minerInfoSlice';
import { selectMinerRecoveries } from './reducers/minerRecoveriesSlice';
import { selectProvingDeadline } from './reducers/provingDeadlineSlice';
import { selectSectorCount } from './reducers/sectorCountSlice';
import { selectSectorsListInStates } from './reducers/sectorsListInStatesSlice';
import { selectSectorsSummary } from './reducers/sectorsSummarySlice';
import { selectStorageInfo } from './reducers/storageInfoSlice';
import { selectStorageList } from './reducers/storageListSlice';
import { selectStorageLocal } from './reducers/storageLocalSlice';
import { selectStorageStat } from './reducers/storageStatSlice';
import { selectWorkerBalance } from './reducers/workerBalanceSlice';
import { selectWorkerJobs } from './reducers/workerJobsSlice';
import { selectWorkerStat } from './reducers/workerStatSlice';

const { Header, Content, Footer } = Layout;

const App: FC = () => {
  // Redux store
  const connectInfo = useSelector(selectConnectInfo);
  const actorInfo = useSelector(selectActorInfo);
  const actorPower = useSelector(selectActorPower);
  const actorState = useSelector(selectActorState);
  const deadlinesPartitions = useSelector(selectDeadlinesPartitions);
  const minerAvailableBalance = useSelector(selectMinerAvailableBalance);
  const minerDeadlines = useSelector(selectMinerDeadlines);
  const minerFaults = useSelector(selectMinerFaults);
  const minerInfo = useSelector(selectMinerInfo);
  const minerRecoveries = useSelector(selectMinerRecoveries);
  const provingDeadline = useSelector(selectProvingDeadline);
  const sectorsCount = useSelector(selectSectorCount);
  const sectorsListInState = useSelector(selectSectorsListInStates);
  const sectorsSummary = useSelector(selectSectorsSummary);
  const storageInfo = useSelector(selectStorageInfo);
  const storageList = useSelector(selectStorageList);
  const storageLocal = useSelector(selectStorageLocal);
  const storageStat = useSelector(selectStorageStat);
  const workerBalance = useSelector(selectWorkerBalance);
  const workerJobs = useSelector(selectWorkerJobs);
  const workerStat = useSelector(selectWorkerStat);

  const dispatch = useDispatch()
  const actorAddress = actorInfo.data.actorAddress;
  const [visibleConnectInfoModal, setVisibleConnectInfoModal] = useState<boolean>(false);

  const handleClickMenu = (e: any) => {
    console.log(e.key)
  }

  const handleClickNode = () => {
    if (actorAddress.length) { return; }  // connected
    setVisibleConnectInfoModal(true);
  }

  const handleOKModalConnectInfo = () => {
    dispatch(fetchActorInfo(connectInfo));
    setVisibleConnectInfoModal(false);
  }

  const handleChangeLotusApi = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(updateLotusApi(e.target.value)); }
  const handleChangeMinerApi = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(updateMinerApi(e.target.value)); }
  const handleChangeLotusToken = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(updateLotusToken(e.target.value)); }
  const handleChangeMinerToken = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(updateMinerToken(e.target.value)); }

  // Message reducer async fetch errors
  message.config({ top: 48 });
  useEffect(() => { if (actorInfo.status === 'failed') { message.error(actorInfo.error) } }, [actorInfo]);
  useEffect(() => { if (actorPower.status === 'failed') { message.error(actorPower.error) } }, [actorPower]);
  useEffect(() => { if (actorState.status === 'failed') { message.error(actorState.error) } }, [actorState]);
  useEffect(() => { if (deadlinesPartitions.status === 'failed') { message.error(deadlinesPartitions.error) } }, [deadlinesPartitions]);
  useEffect(() => { if (minerAvailableBalance.status === 'failed') { message.error(minerAvailableBalance.error) } }, [minerAvailableBalance]);
  useEffect(() => { if (minerDeadlines.status === 'failed') { message.error(minerDeadlines.error) } }, [minerDeadlines]);
  useEffect(() => { if (minerFaults.status === 'failed') { message.error(minerFaults.error) } }, [minerFaults]);
  useEffect(() => { if (minerInfo.status === 'failed') { message.error(minerInfo.error) } }, [minerInfo]);
  useEffect(() => { if (minerRecoveries.status === 'failed') { message.error(minerRecoveries.error) } }, [minerRecoveries]);
  useEffect(() => { if (provingDeadline.status === 'failed') { message.error(provingDeadline.error) } }, [provingDeadline]);
  useEffect(() => { if (sectorsCount.status === 'failed') { message.error(sectorsCount.error) } }, [sectorsCount]);
  useEffect(() => { if (sectorsListInState.status === 'failed') { message.error(sectorsListInState.error) } }, [sectorsListInState]);
  useEffect(() => { if (sectorsSummary.status === 'failed') { message.error(sectorsSummary.error) } }, [sectorsSummary]);
  useEffect(() => { if (storageInfo.status === 'failed') { message.error(storageInfo.error) } }, [storageInfo]);
  useEffect(() => { if (storageList.status === 'failed') { message.error(storageList.error) } }, [storageList]);
  useEffect(() => { if (storageLocal.status === 'failed') { message.error(storageLocal.error) } }, [storageLocal]);
  useEffect(() => { if (storageStat.status === 'failed') { message.error(storageStat.error) } }, [storageStat]);
  useEffect(() => { if (workerBalance.status === 'failed') { message.error(workerBalance.error) } }, [workerBalance]);
  useEffect(() => { if (workerJobs.status === 'failed') { message.error(workerJobs.error) } }, [workerJobs]);
  useEffect(() => { if (workerStat.status === 'failed') { message.error(workerStat.error) } }, [workerStat]);

  useEffect(() => {
    if (actorAddress.length) {
      dispatch(fetchMinerInfo({ connectInfo, actorAddress }));
    }
  }, [connectInfo, actorAddress, dispatch]);

  return (
    <Layout className='oh-my-fil-layout'>
      <Router>
        <Header className='oh-my-fil-header'>
          <Menu theme='light' mode='horizontal' onClick={handleClickMenu} defaultSelectedKeys={['home']}>
            <Menu.Item key='home'><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key='jobs'><Link to="/jobs">Jobs</Link></Menu.Item>
            <Menu.Item key='proving'><Link to="/proving">Proving</Link></Menu.Item>
            <Menu.Item key='workers'><Link to="/workers">Workers</Link></Menu.Item>
            <Menu.Item key='storages'><Link to="/storages">Storages</Link></Menu.Item>
            <Menu.Item key='sectors'><Link to="/sectors">Sectors</Link></Menu.Item>
          </Menu>
          <Divider type='vertical' style={{ height: '60%' }} />
          <Divider type='vertical' style={{ height: '60%' }} />
          <Menu theme='light' mode='horizontal' onClick={handleClickNode}>
            <Menu.Item key='node'>{actorAddress.length ? <><UserOutlined />{actorAddress} ({bytes(actorInfo.data.actorSectorSize)})</> : <>Connect</>}</Menu.Item>
          </Menu>
          <Modal closable={false} visible={visibleConnectInfoModal} title='Node Info' onOk={handleOKModalConnectInfo} onCancel={() => setVisibleConnectInfoModal(false)}>
            <Input allowClear={true} defaultValue={connectInfo.lotusApi} onChange={handleChangeLotusApi} className='oh-my-fil-node-info-button' placeholder='lotus api like 127.0.0.1:1234' />
            <Input allowClear={true} defaultValue={connectInfo.minerApi} onChange={handleChangeMinerApi} className='oh-my-fil-node-info-button' placeholder='miner api like 127.0.0.1:2345' />
            <Input allowClear={true} defaultValue={connectInfo.lotusToken} onChange={handleChangeLotusToken} className='oh-my-fil-node-info-button' placeholder='lotus token' />
            <Input allowClear={true} defaultValue={connectInfo.minerToken} onChange={handleChangeMinerToken} className='oh-my-fil-node-info-button' placeholder='miner token' />
          </Modal>
        </Header>
        <Content className='oh-my-fil-content'>
          <Switch>
            <Route path='/workers'>
              <Workers />
            </Route>
            <Route path='/proving'>
              <Proving />
            </Route>
            <Route path='/jobs'>
              <Jobs />
            </Route>
            <Route path='/storages'>
              <Storage />
            </Route>
            <Route path='/sectors'>
              <Sectors />
            </Route>
            <Route path='/'>
              <Home></Home>
            </Route>
          </Switch>
        </Content>
        <Footer className='oh-my-fil-footer'>
          Oh My Fil ©2020 Created by Jay
      </Footer>
      </Router>
    </Layout>
  );
};

export default App;
