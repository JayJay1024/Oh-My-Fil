import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Layout, Menu, Modal, Input, Divider } from "antd";
import { UserOutlined } from '@ant-design/icons';

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

// Reducers
import {
  updateLotusApi,
  updateMinerApi,
  updateLotusToken,
  updateMinerToken,
  selectConnectInfo,
} from './reducers/connectInfoSlice';
import { fetchActorInfo, selectActorInfo } from './reducers/actorInfoSlice';
import { fetchMinerInfo } from './reducers/minerInfoSlice';

const { Header, Content, Footer } = Layout;

const App: FC = () => {
  const dispatch = useDispatch()
  const connectInfo = useSelector(selectConnectInfo);
  const actorInfo = useSelector(selectActorInfo);

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
            <Menu.Item key='workers'><Link to="/workers">Workers</Link></Menu.Item>
            <Menu.Item key='jobs'><Link to="/jobs">Jobs</Link></Menu.Item>
            <Menu.Item key='storages'>Storages</Menu.Item>
            <Menu.Item key='proving'><Link to="/proving">Proving</Link></Menu.Item>
            <Menu.Item key='sectors'>Sectors</Menu.Item>
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
