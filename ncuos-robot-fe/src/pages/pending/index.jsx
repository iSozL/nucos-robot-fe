import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Popconfirm } from 'antd';
import Request from '../../utils/apiUtils'

const Delete = (props) => {
  function deletes(){
    console.log(props.record.id)
  }
  return(
    <Popconfirm title="确定删除吗?" onConfirm={() => deletes()}>删除</Popconfirm>
  )
}
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
  },
  {
    title: '问题描述',
    dataIndex: 'unrecordedQuestion',
  },
  {
    title: '时间',
    dataIndex: 'time',
  },
  {
    title: '操作',
    render: (text, record) => (<Delete record={record} />)
  }
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    id: i,
    describe: `Edward King ${i}`,
    time: 32,
    action: `London, Park Lane no. ${i}`,
  });
}


class List extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.datas} />
      </div>
    );
  }
}

const Pendding = () => {
  const [datas, setData] = useState()
  useEffect(() => {
    Request('/api/robot/todo', 'get').then(
      res => {
        setData(res.data.undocumented_issues)
      }
    )
  })
  return (
    <PageHeaderWrapper>
      <Card>
        <List datas={datas} />
      </Card>
    </PageHeaderWrapper>
  )
}
export default Pendding
