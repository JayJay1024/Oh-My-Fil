import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Antd
import { Card, Divider, Button, Spin, Tooltip, Switch, Input, message } from "antd";
import { ReloadOutlined, MoreOutlined, WarningOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import '../App.less';
import bytes from 'bytes';
import { taskShortName } from '../utility';
import { Link } from 'react-router-dom';

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
import {
  fetchAutoPledgeInfo,
  enableAutoPledge,
  disableAutoPledge,
  settimeAutoPledge,
  selectAutoPledgeInfo,
  pledgeOneSector,
} from '../reducers/autoPledgeSlice';

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
  const autoPledgeInfo = useSelector(selectAutoPledgeInfo);

  const dispatch = useDispatch()
  const actorAddress = actorInfo.data.actorAddress;
  const [autopledgeTime, setAutoPledgeTime] = useState<number>(autoPledgeInfo.data.time);

  const handleClickSectorsSummary = () => {
    if (actorAddress.length === 0) {
      message.warning('Connect Firstly ~');
      return;
    }
    dispatch(fetchSectorsSummary(connectInfo));
  }

  const handleClickMinerPower = () => {
    if (actorAddress.length === 0) {
      message.warning('Connect Firstly ~');
      return;
    }

    dispatch(fetchSectorCount({ connectInfo, actorAddress }));
    dispatch(fetchMinerRecoveries({ connectInfo, actorAddress }));
    dispatch(fetchActorPower({ connectInfo, actorAddress }));
  }

  const handleClickMinerBalance = () => {
    if (actorAddress.length === 0) {
      message.warning('Connect Firstly ~');
      return;
    }

    const actorAddress1 = {
      owner: minerInfo.data.Owner,
      worker: minerInfo.data.Worker,
      control: minerInfo.data.ControlAddresses[0],
    } as WorkerAddress;
    dispatch(fetchWorkerBalance({ connectInfo, actorAddress: actorAddress1 }));

    dispatch(fetchActorState({ connectInfo, actorAddress }));
    dispatch(fetchMinerAvailableBalance({ connectInfo, actorAddress }));
  }

  const handleClickPledgeOneSector = () => {
    if (actorAddress.length === 0) {
      message.warning('Connect Firstly ~');
      return;
    }
    dispatch(pledgeOneSector(connectInfo));
  }

  const handleClickTasksCount = () => {
    if (actorAddress.length === 0) {
      message.warning('Connect Firstly ~');
      return;
    }
    dispatch(fetchWorkerJobs(connectInfo));
  }

  const handleClickWorkerCount = () => {
    if (actorAddress.length === 0) {
      message.warning('Connect Firstly ~');
      return;
    }
    dispatch(fetchWorkerStat(connectInfo));
  }

  const handleClickAutoPledge = () => {
    if (actorAddress.length === 0) {
      message.warning('Connect Firstly ~');
      return;
    }
    dispatch(fetchAutoPledgeInfo(connectInfo));
  }

  const handleChangeAutoPlageStatus = (cheched: boolean) => {
    if (actorAddress.length === 0) {
      message.warning('Connect Firstly ~');
      return;
    }
    if (cheched) {
      dispatch(enableAutoPledge(connectInfo));
    } else {
      dispatch(disableAutoPledge(connectInfo));
    }
  }

  const handleChanheAutoPledgeSettime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoPledgeTime(Number(e.target.value));
  }

  const handlePressEnterAutoPledgeSettime = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (actorAddress.length === 0) {
      message.warning('Connect Firstly ~');
      return;
    }
    dispatch(settimeAutoPledge({ connectInfo, time: autopledgeTime }));
  }

  useEffect(() => {
    setAutoPledgeTime(autoPledgeInfo.data.time);
  }, [autoPledgeInfo]);

  useEffect(() => {
    if (autoPledgeInfo.status === 'succeeded') {
      message.success('Seccuss ~');
    }
  }, [autoPledgeInfo]);

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
      <Spin
        size='large' delay={200}
        spinning={sectorsSummary.status === 'loading' ? true : false}
      >
        <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={handleClickSectorsSummary}>Sectors Summary</Button>}
          extra={<Tooltip title='More'>
            <Link to='/sectors'><MoreOutlined /></Link>
          </Tooltip>}
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
      </Spin>

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

      <Spin
        size='large' delay={200}
        spinning={workerJobs.status === 'loading' ? true : false}
      >
        <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={handleClickTasksCount}>Tasks Count</Button>}
          extra={<Tooltip title='More'>
            <Link to='/jobs'><MoreOutlined /></Link>
          </Tooltip>}
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
      </Spin>

      <Spin
        size='large' delay={200}
        spinning={workerStat.status === 'loading' ? true : false}
      >
        <Card title={<Tooltip title='这里不要频繁刷新，关联调度程序锁会导致卡很久'>
          <Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={handleClickWorkerCount}>Worker Count</Button>
          <WarningOutlined />
        </Tooltip>}
          extra={<Tooltip title='More'>
            <Link to='/workers'><MoreOutlined /></Link>
          </Tooltip>}
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
      </Spin>

      <Spin
        size='large' delay={200}
        spinning={autoPledgeInfo.status==='loading'?true:false}
      >
        <Card title={<Button type='ghost' icon={<ReloadOutlined />} style={{ border: 'none' }} onClick={handleClickAutoPledge}>Auto Pledge</Button>}
          hoverable={true} bordered={false} size='small' className='oh-my-fil-home-card'
        >
          <div className='oh-my-fil-home-card-item' key='status'>
            <div>Enable:</div>
            <div><Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} checked={autoPledgeInfo.data.enable} onChange={handleChangeAutoPlageStatus} /></div>
          </div>
          <div className='oh-my-fil-home-card-item' key='time'>
            <div>Time:</div>
            <div>
              <Input size='small' type='number' value={autopledgeTime}
                onChange={handleChanheAutoPledgeSettime}
                onPressEnter={handlePressEnterAutoPledgeSettime}
                style={{ textAlign: 'right', width: '80px', backgroundColor: 'transparent', borderRadius: '10px' }}
              /> Seconds
            </div>
          </div>
          <Button type='default' shape='round' size='small' style={{ width: '100%', marginTop: '10px' }} onClick={handleClickPledgeOneSector} >Pledge One Sector</Button>
        </Card>
      </Spin>
    </div>
  );
};

export default Home;
