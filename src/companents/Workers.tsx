import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Antd
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { PageHeader, Descriptions, Badge, Typography, Select, Button, Spin, message } from 'antd';

// Reducers
import { selectConnectInfo } from '../reducers/connectInfoSlice';
import { fetchWorkerStat, selectWorkerStat } from '../reducers/workerStatSlice';

import '../App.less';
import bytes from 'bytes';
import { taskShortName, taskShortShortName } from '../utility';

const Worker: FC = () => {
  const dispatch = useDispatch();
  const workerStat = useSelector(selectWorkerStat);
  const connectInfo = useSelector(selectConnectInfo);

  useEffect(() => { if (workerStat.status === 'failed') { message.error(workerStat.error) } }, [workerStat]);

  return (
    <div className='oh-my-fil-workers-content'>
      <Spin delay={200} size='large' spinning={workerStat.status === 'loading' ? true : false}>
        <PageHeader
          title=''
          extra={[
            <Select
              showSearch={true}
              style={{ width: '400px' }}
              placeholder="Select a worker"
            >
              <Select.Option value='worker007'>Worker 007</Select.Option>
            </Select>,
            <Button icon={<SearchOutlined />}>Search</Button>,
            <Button type='primary' icon={<ReloadOutlined />} onClick={() => dispatch(fetchWorkerStat(connectInfo))}>Refresh</Button>
          ]}
        >
          {Object.keys(workerStat.data).map((key: string) => {
            return (
              <Descriptions bordered size='small' style={{ width: '100%', margin: '0 0 20px 0' }}>
                <Descriptions.Item label='Worker ID' span={2}>
                  <Typography.Text copyable mark>{key}</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label='Urls'>
                  {workerStat.data[key].Info.Urls.map((value: string) => {
                    return (
                      <>
                        <span>{value}</span><br />
                      </>
                    )
                  })}
                </Descriptions.Item>
                <Descriptions.Item label='HostName'>
                  <Typography.Text copyable>{workerStat.data[key].Info.Hostname}</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label='Cpus'>{workerStat.data[key].CpuUse} / {workerStat.data[key].Info.Resources.CPUs}</Descriptions.Item>
                <Descriptions.Item label='Tasks'>
                  {Object.keys(workerStat.data[key].Info.TaskTypes).map((key: string) => `${taskShortShortName(key)} `)}
                </Descriptions.Item>
                <Descriptions.Item label='Gpus'>
                  {workerStat.data[key].Info.Resources.GPUs.map((value: string, index: number) => {
                    let status: "error" | "default" | "success" | "processing" | "warning" | undefined = 'success';
                    if (workerStat.data[key].GpuUsed[index.toString()]) {
                      status = 'processing'
                    }
                    return (
                      <>
                        <Badge status={status} />
                        <span>{value}</span><br />
                      </>
                    )
                  })}
                </Descriptions.Item>
                <Descriptions.Item label='Paralle Limit'>
                  {Object.keys(workerStat.data[key].Info.ParalleTasklLimit).map((value: string) => {
                    return (
                      <>
                        <span>{taskShortName(value)}: {workerStat.data[key].Info.ParalleTasklLimit[value]}</span><br />
                      </>
                    )
                  })}
                </Descriptions.Item>
                <Descriptions.Item label='Memory'>
                  <Typography.Text type='success'>Physical: {bytes(workerStat.data[key].Info.Resources.MemPhysical as number)}</Typography.Text><br />
                  <Typography.Text type='warning'>Swap: {bytes(workerStat.data[key].Info.Resources.MemSwap as number)}</Typography.Text><br />
                  <Typography.Text type='danger'>Reserved: {bytes(workerStat.data[key].Info.Resources.MemReserved as number)}</Typography.Text><br />
                </Descriptions.Item>
                <Descriptions.Item label='Storage' span={3}>
                  {workerStat.data[key].Info.StoragePaths.map((value: any) => {
                    return (
                      <>
                        <span><a href='/storages'>{value.ID}</a>: {value.LocalPath}</span><br />
                      </>
                    )
                  })}
                </Descriptions.Item>
              </Descriptions>
            )
          })}
        </PageHeader>
      </Spin>
    </div>
  )
};

export default Worker;
