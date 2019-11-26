import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Popconfirm, message } from 'antd';
import Request from '../../utils/apiUtils'

const Delete = (props) => {
  function deletes(){
    Request('api/robot/todo', 'DELETE', {record_id: [props.record.id]}).then(
      res => {
        if(res.status == 0) {
          message.success(res.message)
        } else {
          message.error(res.message)
        }
      },
      err => {
        message.error(err.message.toString())
      }
    )
  }
  return(
    <Popconfirm title="确定删除吗?" onConfirm={() => deletes()}>
      <a>删除</a>
    </Popconfirm>
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

class List extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    this.setState({
      selectedRowKeys: [],
      loading: false,
    });
    console.log(this.state.selectedRowKeys)
    Request('api/robot/todo', 'DELETE', {record_id: this.state.selectedRowKeys}).then(
      res => {
        if(res.status == 0) {
          console.log(res)
          message.success(res.message)
        } else {
          message.error(res.message)
        }
      },
      err => {
        message.error(err.message.toString())
      }
    )
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
          <Popconfirm title="确认删除吗?" onConfirm={this.start}>
            <Button type="primary" disabled={!hasSelected} loading={loading}>
              批量删除
            </Button>
          </Popconfirm>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
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
  }, [])
  return (
    <PageHeaderWrapper>
      <Card>
        <List datas={datas} />
      </Card>
    </PageHeaderWrapper>
  )
}
export default Pendding
