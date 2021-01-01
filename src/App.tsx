import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './App.less';

import { Layout, Menu, Modal, Input, Card, Divider, Typography, Button } from "antd";
import { UserOutlined, ReloadOutlined } from '@ant-design/icons';

import {
  updateLotusApi,
  updateMinerApi,
  updateLotusToken,
  updateMinerToken,
  selectConnectInfo,
} from './reducers/connectInfoSlice';

import {
  fetchActorInfo,
  selectActorInfo,
} from './reducers/actorInfoSlice';

import {
  fetchSectorsSummary,
  selectSectorsSummary,
} from './reducers/sectorsSummarySlice';

const { Header, Content, Footer } = Layout;

const App: FC = () => {
  const dispatch = useDispatch()

  const connectInfo = useSelector(selectConnectInfo);
  const actorInfo = useSelector(selectActorInfo);
  const sectorsSummary = useSelector(selectSectorsSummary);

  const [visibleConnectInfoModal, setVisibleConnectInfoModal] = useState<boolean>(false);

  const handleClickMenu = (e: any) => {
    console.log(e.key)
  }

  const handleClickNode = () => {
    if (actorInfo.actorAddress.length) { return; }  // connected
    setVisibleConnectInfoModal(true);
  }

  const handleOKModalConnectInfo = () => {
    setVisibleConnectInfoModal(false);
    dispatch(fetchActorInfo(connectInfo));
  }

  const handleChangeLotusApi = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(updateLotusApi(e.target.value)); }
  const handleChangeMinerApi = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(updateMinerApi(e.target.value)); }
  const handleChangeLotusToken = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(updateLotusToken(e.target.value)); }
  const handleChangeMinerToken = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(updateMinerToken(e.target.value)); }

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
  <Menu.Item key='node'>{actorInfo.actorAddress.length ? <><UserOutlined />{actorInfo.actorAddress}</> : <>Connect</> }</Menu.Item>
        </Menu>
      </Header>
      <Content className='my-fil-content'>
        <Modal closable={false} visible={visibleConnectInfoModal} title='Node Info' onOk={handleOKModalConnectInfo} onCancel={() => setVisibleConnectInfoModal(false)}>
          <Input allowClear={true} defaultValue={connectInfo.lotusApi} onChange={handleChangeLotusApi} className='my-fil-node-info-button' placeholder='lotus api like 127.0.0.1:1234' />
          <Input allowClear={true} defaultValue={connectInfo.minerApi} onChange={handleChangeMinerApi} className='my-fil-node-info-button' placeholder='miner api like 127.0.0.1:2345' />
          <Input allowClear={true} defaultValue={connectInfo.lotusToken} onChange={handleChangeLotusToken} className='my-fil-node-info-button' placeholder='lotus token' />
          <Input allowClear={true} defaultValue={connectInfo.minerToken} onChange={handleChangeMinerToken} className='my-fil-node-info-button' placeholder='miner token' />
        </Modal>
        <Card title={<Button type='dashed' icon={<ReloadOutlined />} onClick={() => dispatch(fetchSectorsSummary(connectInfo))}>Sectors Summary</Button>}
          bordered={true} size='small' style={{ width: '200px' }}
        >
          {Object.keys(sectorsSummary).map((key: string) => {
            return <span key={key}>
              <Typography.Text>{key}: {sectorsSummary[key]}</Typography.Text><br/>
            </span>
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
