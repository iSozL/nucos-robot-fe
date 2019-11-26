import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button } from 'antd';
import Request from '../../utils/apiUtils'

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
  },
  {
    title: '问题描述',
    dataIndex: 'describe',
  },
  {
    title: '时间',
    dataIndex: 'time',
  },
  {
    title: '操作',
    dataIndex: 'action'
  }
];

const data: any[] = [];
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

  onSelectChange = (selectedRowKeys:any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}

const Pendding = () => {
  useEffect(() => {
    Request('/api/robot/todo', 'get').then(
      (res:any) => {
        console.log(res.data.data)
      }
    )
  })
  return (
    <PageHeaderWrapper>
      <Card>
        <List />
      </Card>
    </PageHeaderWrapper>
  )
}
export default Pendding
