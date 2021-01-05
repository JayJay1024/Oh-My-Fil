import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Layout, Menu, Modal, Input, Divider } from "antd";
import { UserOutlined } from '@ant-design/icons';

import './App.less';
import bytes from 'bytes';

// Companents
import Home from './companents/Home';
// import Workers from './companents/Workers';

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
        <Modal closable={false} visible={visibleConnectInfoModal} title='Node Info' onOk={handleOKModalConnectInfo} onCancel={() => setVisibleConnectInfoModal(false)}>
          <Input allowClear={true} defaultValue={connectInfo.lotusApi} onChange={handleChangeLotusApi} className='my-fil-node-info-button' placeholder='lotus api like 127.0.0.1:1234' />
          <Input allowClear={true} defaultValue={connectInfo.minerApi} onChange={handleChangeMinerApi} className='my-fil-node-info-button' placeholder='miner api like 127.0.0.1:2345' />
          <Input allowClear={true} defaultValue={connectInfo.lotusToken} onChange={handleChangeLotusToken} className='my-fil-node-info-button' placeholder='lotus token' />
          <Input allowClear={true} defaultValue={connectInfo.minerToken} onChange={handleChangeMinerToken} className='my-fil-node-info-button' placeholder='miner token' />
        </Modal>
      </Header>
      <Content className='my-fil-content'>
        <Home />
      </Content>
      <Footer className='my-fil-footer'>
        My Fil ©2020 Created by Jay
      </Footer>
    </Layout>
  );
};

export default App;
