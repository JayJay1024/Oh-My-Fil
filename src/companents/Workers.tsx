import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Descriptions, Badge } from 'antd';

import { fetchWorkerStat, selectWorkerStat } from '../reducers/workerStatSlice';

import { taskShortName, taskShortShortName } from '../utility';

import bytes from 'bytes';

const Worker: FC = () => {
  const workerStat = useSelector(selectWorkerStat);

  return (
    <div>
      {Object.keys(workerStat.data).map((key: string) => {
        return (
          <Descriptions bordered size='small' title={`Worker: ${key}`}>
            <Descriptions.Item label='HostName'>{workerStat.data[key].Info.Hostname}</Descriptions.Item>
            <Descriptions.Item label='Cpus'>{workerStat.data[key].CpuUse} / {workerStat.data[key].Info.Resources.CPUs}</Descriptions.Item>
            <Descriptions.Item label='Tasks'>
              {Object.keys(workerStat.data[key].Info.TaskTypes).map((key: string) => `${taskShortShortName(key)} `)}
            </Descriptions.Item>
            <Descriptions.Item label='Urls'>
              {workerStat.data[key].Info.Urls.map((value: string) => {
                return (
                  <>
                    <span>{value}</span><br/>
                  </>
                )
              })}
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
                    <span>{value}</span><br/>
                  </>
                )
              })}
            </Descriptions.Item>
            <Descriptions.Item label='Paralle Limit'>
              {Object.keys(workerStat.data[key].Info.ParalleTasklLimit).map((value: string) => {
                return (
                  <>
                    <span>{taskShortName(value)}: {workerStat.data[key].Info.ParalleTasklLimit[value]}</span><br/>
                  </>
                )
              })}
            </Descriptions.Item>
            <Descriptions.Item label='Memory'>
              <span>Physical: {bytes(workerStat.data[key].Info.Resources.MemPhysical as number)}</span><br/>
              <span>Swap: {bytes(workerStat.data[key].Info.Resources.MemSwap as number)}</span><br/>
              <span>Reserved: {bytes(workerStat.data[key].Info.Resources.MemReserved as number)}</span><br/>
            </Descriptions.Item>
            <Descriptions.Item label='Storage' span={2}>
              {workerStat.data[key].Info.StoragePaths.map((value: any) => {
                return (
                  <>
                    <span>{value.ID}: {value.LocalPath}</span><br/>
                  </>
                )
              })}
            </Descriptions.Item>
          </Descriptions>
        )
      })}
    </div>
  )
};

export default Worker;
