import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Antd
import { ColumnsType } from 'antd/es/table';
import { Row, Col, Statistic } from 'antd';
import { PageHeader, Table, Button, Spin } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

// Reducers
import { selectWorkerStat } from '../reducers/workerStatSlice';
import { selectConnectInfo } from '../reducers/connectInfoSlice';
import { fetchWorkerJobs, selectWorkerJobs, WorkerJobsState } from '../reducers/workerJobsSlice';

import '../App.less';
import prettyMs from 'pretty-ms';
import { taskShortShortName } from '../utility';

const Proving: FC = () => {
  const dispatch = useDispatch();
  const connectInfo = useSelector(selectConnectInfo);
  const workerStat = useSelector(selectWorkerStat);
  const workersJobs = useSelector(selectWorkerJobs);

  interface JobsTableDataState {
    key: number,
    idx: number,
    sector: number,
    worker: string,
    hostname: string,
    task: string,
    state: string,
    time: string,
  }

  interface LineState {
    job: WorkerJobsState,
    wid: string,
  }

  interface FiltersState {
    text: string,
    value: string,
  }

  const lines: LineState[] = [];
  Object.keys(workersJobs.data).forEach((wid: string) => {
    const jobs = workersJobs.data[wid];
    jobs.forEach((job) => {
      lines.push({
        job: job,
        wid: wid
      });
    });
  });
  lines.sort((a, b) => {
    if (a.job.RunWait !== b.job.RunWait) {
      return a.job.RunWait - b.job.RunWait
    }

    const da = new Date(a.job.Start);
    const db = new Date(b.job.Start);
    return da.getTime() - db.getTime();
  });

  const hostFilters = new Set<string>();
  const taskFilters = new Set<string>();
  const workerFilters = new Set<string>();

  const jobsTableData: JobsTableDataState[] = [];
  lines.forEach((l, idx) => {
    let hostname = 'unknow';
    if (workerStat.data[l.wid]) {
      hostname = workerStat.data[l.wid].Info.Hostname
    }
    const task: string = taskShortShortName(l.job.Task) || 'unknow';
    const worker: string = l.wid.split('-')[0];

    taskFilters.add(task);
    workerFilters.add(worker);
    hostFilters.add(hostname);

    jobsTableData.push({
      key: l.job.Sector.Number,
      idx: lines.length - idx,
      sector: l.job.Sector.Number,
      worker: worker,
      hostname: hostname,
      task: task,
      state: 'running',
      time: prettyMs((new Date()).getTime() - (new Date(l.job.Start)).getTime()),
    });
  });

  const jobsTableColumns: ColumnsType<JobsTableDataState> = [{
    title: 'Index',
    dataIndex: 'idx',
    key: 'idx',
    align: 'left',
  }, {
    title: 'Sector',
    dataIndex: 'sector',
    key: 'sector',
    align: 'center',
  }, {
    title: 'Worker',
    dataIndex: 'worker',
    key: 'worker',
    align: 'center',
    filters: Array.from(workerFilters).map((worker: string): FiltersState => {
      return { text: worker, value: worker }
    }),
    onFilter: (value, record) => record.worker === value,
  }, {
    title: 'Hostname',
    dataIndex: 'hostname',
    key: 'hostname',
    align: 'center',
    filters: Array.from(hostFilters).map((hostname: string): FiltersState => {
      return { text: hostname, value: hostname }
    }),
    onFilter: (value, record) => record.hostname === value,
  }, {
    title: 'Task',
    dataIndex: 'task',
    key: 'task',
    align: 'center',
    filters: Array.from(taskFilters).map((task: string): FiltersState => {
      return { text: task, value: task }
    }),
    onFilter: (value, record) => record.task === value,
  }, {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    align: 'center',
  }, {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    align: 'left',
  }];

  return (
    <div className='oh-my-fil-jobs-content'>
      <Spin
        delay={200} size='large'
        spinning={workersJobs.status==='loading'?true:false}
      >
        <PageHeader
          title=''
          extra={[
            <Button type='primary' icon={<ReloadOutlined />} onClick={() => dispatch(fetchWorkerJobs(connectInfo))}>Refresh</Button>
          ]}
        >
          <Row gutter={16} justify='space-around'>
            <Col span={6} style={{ textAlign: 'left' }}>
              <Statistic title='Hosts' value={Array.from(hostFilters).length} />
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
              <Statistic title='Workers' value={Array.from(workerFilters).length} />
            </Col>
            <Col span={6} style={{ textAlign: 'right' }}>
              <Statistic title='Jobs' value={lines.length} />
            </Col>
          </Row>
          <Table columns={jobsTableColumns} dataSource={jobsTableData} pagination={{ pageSize: 2048, hideOnSinglePage: true }} style={{ marginTop: '20px' }} />
        </PageHeader>
      </Spin>
    </div>
  )
};

export default Proving;
