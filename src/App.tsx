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

// React DnD
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Companents
import Home from './components/Home';
import Jobs from './components/Jobs';
import Workers from './components/Workers';
import Proving from './components/Proving';
import Sectors from './components/Sectors';
import Storage from './components/Storage';

// Reducers
import {
  updateLotusApi,
  updateMinerApi,
  updateLotusToken,
  updateMinerToken,
  selectConnectInfo,
} from './features/connectInfo/connectInfoSlice';
import { fetchActorInfo, selectActorInfo } from './features/actorInfo/actorInfoSlice';
import { selectActorPower } from './features/actorPower/actorPowerSlice';
import { selectActorState } from './features/actorState/actorStateSlice';
import { selectDeadlinesPartitions } from './features/deadlinesPartitions/deadlinesPartitionsSlice';
import { selectMinerAvailableBalance } from './features/minerAvailableBalance/minerAvailableBalanceSlice';
import { selectMinerDeadlines } from './features/minerDeadlines/minerDeadlinesSlice';
import { selectMinerFaults } from './features/minerFaults/minerFaultsSlice';
import { fetchMinerInfo, selectMinerInfo } from './features/minerInfo/minerInfoSlice';
import { selectMinerRecoveries } from './features/minerRecoveries/minerRecoveriesSlice';
import { selectProvingDeadline } from './features/provingDeadlines/provingDeadlineSlice';
import { selectSectorCount } from './features/sectorsCount/sectorsCountSlice';
import { selectSectorsListInStates } from './features/sectorsListInState/sectorsListInStatesSlice';
import { selectSectorsSummary } from './features/sectorsSummary/sectorsSummarySlice';
import { selectStorageInfo } from './features/storageInfo/storageInfoSlice';
import { selectStorageList } from './features/storageList/storageListSlice';
import { selectStorageLocal } from './features/storageLocal/storageLocalSlice';
import { selectStorageStat } from './features/storageStat/storageStatSlice';
import { selectWorkerBalance } from './features/workerBalance/workerBalanceSlice';
import { selectWorkerJobs } from './features/workerJobs/workerJobsSlice';
import { selectWorkerStat } from './features/workerStat/workerStatSlice';
import { selectAutoPledgeInfo } from './features/autoPledge/autoPledgeSlice';

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
  const autoPledgeInfo = useSelector(selectAutoPledgeInfo);

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
  useEffect(() => { if (autoPledgeInfo.status === 'failed') { message.error(autoPledgeInfo.error) } }, [autoPledgeInfo]);

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
            <Menu.Item key='home'><Link to="/ohmyfil">Home</Link></Menu.Item>
            <Menu.Item key='jobs'><Link to="/ohmyfil/jobs">Jobs</Link></Menu.Item>
            <Menu.Item key='proving'><Link to="/ohmyfil/proving">Proving</Link></Menu.Item>
            <Menu.Item key='workers'><Link to="/ohmyfil/workers">Workers</Link></Menu.Item>
            <Menu.Item key='storages'><Link to="/ohmyfil/storages">Storages</Link></Menu.Item>
            <Menu.Item key='sectors'><Link to="/ohmyfil/sectors">Sectors</Link></Menu.Item>
          </Menu>
          <Divider type='vertical' style={{ height: '60%' }} />
          <Divider type='vertical' style={{ height: '60%' }} />
          <Menu theme='light' mode='horizontal' onClick={handleClickNode}>
            <Menu.Item key='node'>{actorAddress.length ? <><UserOutlined />{actorAddress} ({bytes(actorInfo.data.actorSectorSize)})</> : <>Connect</>}</Menu.Item>
          </Menu>
          <Modal closable={false} visible={visibleConnectInfoModal} title='Connect Info' onOk={handleOKModalConnectInfo} onCancel={() => setVisibleConnectInfoModal(false)}>
            <Input allowClear={true} onChange={handleChangeLotusApi}   className='oh-my-fil-node-info-button' placeholder='127.0.0.1:1234' />
            <Input allowClear={true} onChange={handleChangeMinerApi}   className='oh-my-fil-node-info-button' placeholder='127.0.0.1:2345' />
            <Input allowClear={true} onChange={handleChangeLotusToken} className='oh-my-fil-node-info-button' placeholder='lotus token' />
            <Input allowClear={true} onChange={handleChangeMinerToken} className='oh-my-fil-node-info-button' placeholder='miner token' />
          </Modal>
        </Header>
        <Content className='oh-my-fil-content'>
          <Switch>
            <Route path='/ohmyfil/workers/'>
              <Workers />
            </Route>
            <Route path='/ohmyfil/proving/'>
              <Proving />
            </Route>
            <Route path='/ohmyfil/jobs/'>
              <Jobs />
            </Route>
            <Route path='/ohmyfil/storages/'>
              <Storage />
            </Route>
            <Route path='/ohmyfil/sectors/'>
              <Sectors />
            </Route>
            <Route path='/ohmyfil/'>
              <DndProvider backend={HTML5Backend}>
                <Home />
              </DndProvider>
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
