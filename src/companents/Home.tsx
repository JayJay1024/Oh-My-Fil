import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Antd
import { Card, Divider, Button, Spin, message } from "antd";
import { ReloadOutlined } from '@ant-design/icons';

import '../App.less';
import bytes from 'bytes';
import { taskShortName } from '../utility';

// Reducers
import { selectConnectInfo } from '../reducers/connectInfoSlice';
import { selectActorInfo } from '../reducers/actorInfoSlice';
import { fetchSectorsSummary, selectSectorsSummary } from '../reducers/sectorsSummarySlice';
import { fetchSectorCount, selectSectorCount } from '../reducers/sectorCountSlice';
import { fetchMinerRecoveries, selectMinerRecoveries } from '../reducers/minerRecoveriesSlice';
import { fetchMinerAvailableBalance, selectMinerAvailableBalance } from '../reducers/minerAvailableBalanceSlice';
import { fetchActorState, selectActorState } from '../reducers/actorStateSlice';
import { fetchWorkerBalance, selectWorkerBalance, WorkerAddress } from '../reducers/workerBalanceSlice';
import { selectMinerInfo } from '../reducers/minerInfoSlice';
import { fetchActorPower, selectActorPower } from '../reducers/actorPowerSlice';
import { fetchWorkerJobs, selectWorkerJobs } from '../reducers/workerJobsSlice';
import { fetchWorkerStat, selectWorkerStat } from '../reducers/workerStatSlice';

const nano2fil = (nanoString: string): string => {
  return (parseInt(nanoString.slice(0, -9)) / (Math.pow(10, 9))).toFixed(3)
}

const Home: FC = () => {
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
  const workerStat = useSelector(selectWorkerStat);

  const dispatch = useDispatch()
  const actorAddress = actorInfo.data.actorAddress;

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
    dispatch(fetchWorkerBalance({ connectInfo, actorAddress: actorAddress1 }));

    dispatch(fetchActorState({ connectInfo, actorAddress }));
    dispatch(fetchMinerAvailableBalance({ connectInfo, actorAddress }));
  }

  useEffect(() => { if (minerRecoveries.status === 'failed')       { message.error(minerRecoveries.error) } },       [minerRecoveries]);
  useEffect(() => { if (actorState.status === 'failed')            { message.error(actorState.error) } },            [actorState]);
  useEffect(() => { if (minerAvailableBalance.status === 'failed') { message.error(minerAvailableBalance.error) } }, [minerAvailableBalance]);
  useEffect(() => { if (minerInfo.status === 'failed')             { message.error(minerInfo.error) } },             [minerInfo]);
  useEffect(() => { if (workerBalance.status === 'failed')         { message.error(workerBalance.error) } },         [workerBalance]);
  useEffect(() => { if (workerJobs.status === 'failed')            { message.error(workerJobs.error) } },            [workerJobs]);
  useEffect(() => { if (workerStat.status === 'failed')            { message.error(workerStat.error) } },            [workerStat]);
  useEffect(() => { if (sectorCount.status === 'failed')           { message.error(sectorCount.error) } },           [sectorCount]);
  useEffect(() => { if (actorPower.status === 'failed')            { message.error(actorPower.error) } },            [actorPower]);

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

  // Worker count
  interface WorkerCountState {
    [index: string]: number
  }
  let totalWorker: number = 0;
  let workerCount: WorkerCountState = {};
  for (let wid in workerStat.data) {
    totalWorker++;
    const tasks = Object.keys(workerStat.data[wid].Info.TaskTypes);

    for (let taskFullName of tasks) {
      const task = taskShortName(taskFullName);
      if (task) {
        const count = workerCount[task] || 0;
        workerCount[task] = count + 1;
      }
    }
  }
  workerCount['Total'] = totalWorker;

  return (
    <div className='oh-my-fil-home-content'>
      <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={() => dispatch(fetchSectorsSummary(connectInfo))}>Sectors Summary</Button>}
        extra={sectorsSummary.status === 'loading' ? <Spin size='small' delay={200} /> : ''}
        hoverable={true} bordered={false} size='small' className='oh-my-fil-home-card'
      >
        {Object.keys(sectorsSummary.data).map((key: string) => {
          return (
            <div className='oh-my-fil-home-card-item' key={key}>
              <div>{key}:</div>
              <div>{sectorsSummary.data[key]}</div>
            </div>
          )
        })}
      </Card>
      <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={handleClickMinerPower}>Miner Power</Button>}
        extra={sectorCount.status === 'loading' || minerRecoveries.status === 'loading' ? <Spin size='small' delay={200} /> : ''}
        hoverable={true} bordered={false} size='small' className='oh-my-fil-home-card'
      >
        <Divider plain style={{ margin: '0px' }}>Power:</Divider>
        <div className='oh-my-fil-home-card-item'>
          <div>Growth:</div>
          <div>{bytes((sectorCount.data.Live - sectorCount.data.Active) * actorInfo.data.actorSectorSize)}</div>
        </div>
        <div className='oh-my-fil-home-card-item'>
          <div>Committed:</div>
          <div>{bytes(sectorCount.data.Live * actorInfo.data.actorSectorSize)}</div>
        </div>
        <div className='oh-my-fil-home-card-item'>
          <div>Proving:</div>
          <div>{bytes(sectorCount.data.Active * actorInfo.data.actorSectorSize)}</div>
        </div>
        <div className='oh-my-fil-home-card-item'>
          <div>Faulty:</div>
          <div>{bytes(sectorCount.data.Faulty * actorInfo.data.actorSectorSize)}</div>
        </div>
        <div className='oh-my-fil-home-card-item'>
          <div>Recoveries:</div>
          <div>{bytes(minerRecoveries.data[0] * actorInfo.data.actorSectorSize)}</div>
        </div>
        <Divider plain style={{ margin: '0px' }}>Expected:</Divider>
        <div className='oh-my-fil-home-card-item'>
          <div>Win Rate:</div>
          <div>{winPerDay.toFixed(4)}/day</div>
        </div>
      </Card>
      <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={handleClickMinerBalance}>Miner Balance</Button>}
        extra={actorState.status === 'loading' || minerAvailableBalance.status === 'loading' || workerBalance.status === 'loading' ? <Spin size='small' delay={200} /> : ''}
        hoverable={true} bordered={false} size='small' className='oh-my-fil-home-card'
      >
        <Divider plain style={{ margin: '0px' }}>Miner Balance:</Divider>
        <div className='oh-my-fil-home-card-item'>
          <div>Total:</div>
          <div>{nano2fil(actorState.data.Balance)} FIL</div>
        </div>
        <div className='oh-my-fil-home-card-item'>
          <div>PreCommit:</div>
          <div>{nano2fil(actorState.data.State.PreCommitDeposits)} FIL</div>
        </div>
        <div className='oh-my-fil-home-card-item'>
          <div>Pledge:</div>
          <div>{nano2fil(actorState.data.State.InitialPledge)} FIL</div>
        </div>
        <div className='oh-my-fil-home-card-item'>
          <div>Vesting:</div>
          <div>{nano2fil(actorState.data.State.LockedFunds)} FIL</div>
        </div>
        <div className='oh-my-fil-home-card-item'>
          <div>Available:</div>
          <div>{nano2fil(minerAvailableBalance.data)} FIL</div>
        </div>
        <Divider plain style={{ margin: '0px' }}>Worker Balance:</Divider>
        <div className='oh-my-fil-home-card-item'>
          <div>Owner:</div>
          <div>{nano2fil(workerBalance.data.owner)} FIL</div>
        </div>
        <div className='oh-my-fil-home-card-item'>
          <div>Worker:</div>
          <div>{nano2fil(workerBalance.data.worker)} FIL</div>
        </div>
        <div className='oh-my-fil-home-card-item'>
          <div>Control:</div>
          <div>{nano2fil(workerBalance.data.control)} FIL</div>
        </div>
      </Card>
      <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={() => dispatch(fetchWorkerJobs(connectInfo))}>Tasks Count</Button>}
        extra={workerJobs.status === 'loading' ? <Spin size='small' delay={200} /> : ''}
        hoverable={true} bordered={false} size='small' className='oh-my-fil-home-card'
      >
        {Object.keys(taskCount).map((key: string) => {
          return (
            <div className='oh-my-fil-home-card-item' key={key}>
              <div>{key}:</div>
              <div>{taskCount[key]}</div>
            </div>
          )
        })}
      </Card>
      <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={() => dispatch(fetchWorkerStat(connectInfo))}>Worker Count</Button>}
        extra={workerStat.status === 'loading' ? <Spin size='small' delay={200} /> : ''}
        hoverable={true} bordered={false} size='small' className='oh-my-fil-home-card'
      >
        {Object.keys(workerCount).map((key: string) => {
          return (
            <div className='oh-my-fil-home-card-item' key={key}>
              <div>{key}:</div>
              <div>{workerCount[key]}</div>
            </div>
          )
        })}
      </Card>
    </div>
  );
};

export default Home;
