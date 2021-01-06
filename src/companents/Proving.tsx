import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Antd
import { ColumnsType } from 'antd/es/table';
import { Row, Col, Statistic } from 'antd';
import { PageHeader, Table, Button, Spin, message } from 'antd';
import { ReloadOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';

// Reducers
import { selectActorInfo } from '../reducers/actorInfoSlice';
import { selectConnectInfo } from '../reducers/connectInfoSlice';
import { fetchMinerDeadlines, selectMinerDeadlines } from '../reducers/minerDeadlinesSlice';
import { fetchProvingDeadline, selectProvingDeadline } from '../reducers/provingDeadlineSlice';
import { fetchDeadlinesPartitions, selectDeadlinesPartitions } from '../reducers/deadlinesPartitionsSlice';

import '../App.less';
import { bitCount } from '../utility';

const Proving: FC = () => {
  const actorInfo = useSelector(selectActorInfo);
  const connectInfo = useSelector(selectConnectInfo);
  const minerDeadlines = useSelector(selectMinerDeadlines);
  const provingDeadline = useSelector(selectProvingDeadline);
  const deadlinesPartitions = useSelector(selectDeadlinesPartitions);

  const dispatch = useDispatch();
  const actorAddress = actorInfo.data.actorAddress;

  interface DeadlinesTableDataState {
    key: number,
    deadline: number,
    partitions: number,
    sectors: number,
    faults: number,
    provenPartitions: number,
  }

  const deadlinesTableColumns: ColumnsType<DeadlinesTableDataState> = [{
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline',
    align: 'center',
    render: (text: number) => <span>{text}</span>
  }, {
    title: 'Partitions',
    dataIndex: 'partitions',
    key: 'partitions',
    align: 'center',
  }, {
    title: 'Sectors',
    dataIndex: 'sectors',
    key: 'sectors',
    align: 'center',
  }, {
    title: 'Faults',
    dataIndex: 'faults',
    key: 'faults',
    align: 'center',
  }, {
    title: 'Proven Partitions',
    dataIndex: 'provenPartitions',
    key: 'provenPartitions',
    align: 'center',
    render: (text: number, record: DeadlinesTableDataState) => {return record.deadline===provingDeadline.data.Index?<>{text} <SyncOutlined spin style={{ color: 'blue' }} /></>:<>{text} <ClockCircleOutlined /></>}
  }];

  const deadlinesTableData: DeadlinesTableDataState[] = [];
  minerDeadlines.data.forEach((deadline, dIdx) => {
    const partitions = deadlinesPartitions.data[dIdx] || [];
    const provenPartitions = bitCount(deadline.PostSubmissions);

    let faults: number = 0;
    let sectors: number = 0;

    partitions.forEach((partition) => {
      faults += bitCount(partition.FaultySectors);
      sectors += bitCount(partition.AllSectors);
    });

    deadlinesTableData.push({
      key: dIdx,
      deadline: dIdx,
      partitions: partitions.length,
      sectors: sectors,
      faults: faults,
      provenPartitions: provenPartitions,
    });
  });


  const handleClickRefresh = () => {
    dispatch(fetchMinerDeadlines({ connectInfo, actorAddress }));
    dispatch(fetchProvingDeadline({ connectInfo, actorAddress }));
    dispatch(fetchDeadlinesPartitions({ connectInfo, actorAddress }));
  }

  useEffect(() => { if (minerDeadlines.status==='failed')      { message.error(minerDeadlines.error) } },      [minerDeadlines]);
  useEffect(() => { if (provingDeadline.status==='failed')     { message.error(provingDeadline.error) } },     [provingDeadline]);
  useEffect(() => { if (deadlinesPartitions.status==='failed') { message.error(deadlinesPartitions.error) } }, [deadlinesPartitions]);

  return (
    <div className='oh-my-fil-proving-content'>
      <Spin
        delay={200} size='large' 
        spinning={minerDeadlines.status==='loading'||provingDeadline.status==='loading'||deadlinesPartitions.status==='loading'?true:false}
      >
        <PageHeader
          title=''
          extra={[
            <Button type='primary' icon={<ReloadOutlined />} onClick={handleClickRefresh}>Refresh</Button>
          ]}
        >
          <Row   gutter={56}>
            <Col span={6}>
              <Statistic title='CurrentEpoch' value={provingDeadline.data.CurrentEpoch} />
            </Col>
            <Col span={6}>
              <Statistic title='PeriodStart' value={provingDeadline.data.PeriodStart} />
            </Col>
            <Col span={6}>
              <Statistic title='Index' value={provingDeadline.data.Index} />
            </Col>
            <Col span={6}>
              <Statistic title='Open' value={provingDeadline.data.Open} />
            </Col>
          </Row>
          <Row   gutter={56}>
            <Col span={6}>
              <Statistic title='Close' value={provingDeadline.data.Close} />
            </Col>
            <Col span={6}>
              <Statistic title='Challenge' value={provingDeadline.data.Challenge} />
            </Col>
            <Col span={6}>
              <Statistic title='FaultCutoff' value={provingDeadline.data.FaultCutoff} />
            </Col>
            <Col span={6}>
              <Statistic title='WPoStPeriodDeadlines' value={provingDeadline.data.WPoStPeriodDeadlines} />
            </Col>
          </Row>
          <Row   gutter={56}>
            <Col span={6}>
              <Statistic title='WPoStProvingPeriod' value={provingDeadline.data.WPoStProvingPeriod} />
            </Col>
            <Col span={6}>
              <Statistic title='WPoStChallengeWindow' value={provingDeadline.data.WPoStChallengeWindow} />
            </Col>
            <Col span={6}>
              <Statistic title='WPoStChallengeLookback' value={provingDeadline.data.WPoStChallengeLookback} />
            </Col>
            <Col span={6}>
              <Statistic title='FaultDeclarationCutoff' value={provingDeadline.data.FaultDeclarationCutoff} />
            </Col>
          </Row>
          <Table columns={deadlinesTableColumns} dataSource={deadlinesTableData} pagination={{ pageSize: 48, hideOnSinglePage: true }} style={{ marginTop: '20px' }} />
        </PageHeader>
      </Spin>
    </div>
  )
};

export default Proving;
