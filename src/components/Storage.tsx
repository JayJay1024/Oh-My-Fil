import { FC, useEffect } from 'react';
import bytes from 'bytes';
import { useSelector, useDispatch } from 'react-redux';

// Antd
import { ReloadOutlined } from '@ant-design/icons';
import { Descriptions, Spin, Button, PageHeader, Typography, Tooltip, Progress, Row, Col, Statistic, message } from 'antd';

import { RootState } from '../index';
import { fetchStorageList } from '../features/storageList/storageListSlice';
import { fetchStorageStat } from '../features/storageStat/storageStatSlice';
import { fetchStorageInfo } from '../features/storageInfo/storageInfoSlice';
import { fetchStorageLocal } from '../features/storageLocal/storageLocalSlice';

const SectorFileType = {
  FTUnsealed: 1 << 0,
  FTSealed: 1 << 1,
  FTCache: 1 << 2,
}

const Storage: FC = () => {
  const dispatch = useDispatch();

  const connectInfo = useSelector((state: RootState) => state.connectInfo);
  const storageList = useSelector((state: RootState) => state.storageList);
  const storageStat = useSelector((state: RootState) => state.storageStat);
  const storageInfo = useSelector((state: RootState) => state.storageInfo);
  const storageLocal = useSelector((state: RootState) => state.storageLocal);

  useEffect(() => {
    if (storageList.status === 'succeeded') {
      const storageIds = Object.keys(storageList.data);
      dispatch(fetchStorageStat({ connectInfo, storageIds }));
      dispatch(fetchStorageInfo({ connectInfo, storageIds }));
    }
  }, [dispatch, storageList, connectInfo]);

  const handleClickRefresh = () => {
    if (connectInfo.minerApi.length + connectInfo.minerToken.length === 0) {
      message.warning('Connect Firstly ~');
      return;
    }
    dispatch(fetchStorageList(connectInfo));
    dispatch(fetchStorageLocal(connectInfo));
  }

  let allSectors = 0, canStore = 0;
  const storageIds: string[] = [];
  Object.keys(storageLocal.data).forEach(storageId => storageIds.push(storageId));
  Object.keys(storageList.data).forEach(storageId => {
    if (!storageLocal.data[storageId]) {
      storageIds.push(storageId);
    }
    allSectors += storageList.data[storageId].length;

    const sInfo = storageInfo.data[storageId];
    if (sInfo && sInfo.CanStore) {
      canStore += 1;
    }
  });

  return (
    <div className='oh-my-fil-storage-content' >
      <Spin delay={200} size='large'
        spinning={storageList.status === 'loading' || storageStat.status === 'loading' || storageInfo.status === 'loading' || storageLocal.status === 'loading'}
      >
        <PageHeader
          title=''
          extra={[
            <Button type='primary' icon={<ReloadOutlined />} onClick={handleClickRefresh}>
              Refresh
            </Button>
          ]}
        >
          <Row gutter={56} justify='end' style={{ padding: '0 5px' }} >
            <Col span={8} style={{ textAlign: 'start' }} >
              <Statistic title='Storages' value={storageIds.length} />
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Statistic title='Sectors' value={allSectors} />
            </Col>
            <Col span={8} style={{ textAlign: 'end' }} >
              <Statistic title='CanStore' value={canStore} />
            </Col>
          </Row>
          {storageIds.map(storageId => {
            const sList = storageList.data[storageId];
            const sStat = storageStat.data[storageId];
            const sInfo = storageInfo.data[storageId];

            let unsealed = 0, sealed = 0, cache = 0;
            if (sList) {
              sList.forEach(sector => {
                if (sector.SectorFileType & SectorFileType.FTUnsealed) { unsealed++; }
                if (sector.SectorFileType & SectorFileType.FTSealed) { sealed++; }
                if (sector.SectorFileType & SectorFileType.FTCache) { cache++; }
              });
            }

            return (
              <Descriptions bordered size='small' style={{ width: '100%', margin: '10px 0' }}>
                <Descriptions.Item label='Storage ID' span={2}>
                  <Typography.Text copyable mark>{storageId}</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label='Weight'>
                  {sInfo ? sInfo.Weight : 'Unknown ~'}
                </Descriptions.Item>

                <Descriptions.Item label='Path' span={2}>
                  <Typography.Text copyable={sInfo?true:false}>{sInfo ? sInfo.Path : 'Unknown ~'}</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label='Use'>
                  {sInfo ?
                    <>
                      {sInfo.CanSeal&&<><span>Seal</span><br/></>}
                      {sInfo.CanStore&&<><span>Store</span><br/></>}
                      {!sInfo.CanSeal&&!sInfo.CanStore&&<><span>None</span><br/></>}
                    </> : 'Unknown ~'}
                </Descriptions.Item>

                <Descriptions.Item label='Urls' span={2}>
                  {sInfo ? sInfo.URLs.map(url => {
                    return (
                      <>
                        <span>{url}</span><br/>
                      </>
                    )
                  }) : 'Unknown ~'}
                </Descriptions.Item>
                <Descriptions.Item label='Sectors'>
                  <>
                    <span>Cache: {cache}</span><br/>
                    <span>Sealed: {sealed}</span><br/>
                    <span>Unsealed: {unsealed}</span><br/>
                  </>
                </Descriptions.Item>

                <Descriptions.Item label='Disk' span={3} >
                  {sStat ? 
                    <Tooltip title={bytes(sStat.Reserved)+' '+bytes(sStat.Capacity-sStat.Available)+'/'+bytes(sStat.Capacity)}>
                      <Progress percent={Number(((sStat.Capacity-sStat.Available)/sStat.Capacity*100).toFixed(2))} success={{ percent: (sStat.Reserved/sStat.Capacity)*100 }} style={{ paddingRight: '20px' }} />
                    </Tooltip>
                   : 'Unknown ~'}
                </Descriptions.Item>
              </Descriptions>
            );
          })}
        </PageHeader>
      </Spin>

    </div>
  )
};

export default Storage;
