import React from 'react';
import { Table, Card, Upload, message, Button, Icon, Modal, Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import style from './index.less'

const { TextArea } = Input
class UploadBox extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          <Icon type="to-top" />上传文件
        </Button>
        <Modal
          title="上传文件"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={400}
        >
          <div className={style.uploader}>
            <div><span>文件名称:</span><Input /></div>
            <div><span>简单说明:</span><TextArea /></div>
            <div><span>上传者:</span><Input /></div>
            <div style={{ fontWeight: 1000, marginBottom: 10, marginTop: 10 }}>
              <Uploader />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const Uploader = () => {
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Upload {...props}>
      <Button>
        <Icon type="upload" /> Click to Upload
    </Button>
    </Upload>
  )
}
const Index = () => {
  const columns = [
    {
      title: '描述',
      dataIndex: 'describe',
      key: 'describe',
      render: text => <div>{text}</div>,
    },
    {
      title: '上传者',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '上传时间',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  const data = [
    {
      key: '1',
      describe: '问答库1.0',
      name: 'nmsl',
      time: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      describe: '问答库2.0',
      name: 'wmsl',
      time: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      describe: '问答库3.0',
      name: 'tmsl',
      time: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      describe: '问答库3.0',
      name: 'tmsl',
      time: 'Sidney No. 1 Lake Park',
    },
    {
      key: '5',
      describe: '问答库3.0',
      name: 'tmsl',
      time: 'Sidney No. 1 Lake Park',
    },
    {
      key: '6',
      describe: '问答库3.0',
      name: 'tmsl',
      time: 'Sidney No. 1 Lake Park',
    },
    {
      key: '7',
      describe: '问答库3.0',
      name: 'tmsl',
      time: 'Sidney No. 1 Lake Park',
    },
    {
      key: '8',
      describe: '问答库3.0',
      name: 'tmsl',
      time: 'Sidney No. 1 Lake Park',
    },
    {
      key: '9',
      describe: '问答库3.0',
      name: 'tmsl',
      time: 'Sidney No. 1 Lake Park',
    },
    {
      key: '10',
      describe: '问答库3.0',
      name: 'tmsl',
      time: 'Sidney No. 1 Lake Park',
    },
    {
      key: '11',
      describe: '问答库3.0',
      name: 'tmsl',
      time: 'Sidney No. 1 Lake Park',
    },
    {
      key: '12',
      describe: '问答库3.0',
      name: 'tmsl',
      time: 'Sidney No. 1 Lake Park',
    },
    {
      key: '13',
      describe: '问答库3.0',
      name: 'tmsl',
      time: 'Sidney No. 1 Lake Park',
    },
    {
      key: '14',
      describe: '问答库3.0',
      name: 'tmsl',
      time: 'Sidney No. 1 Lake Park',
    },
  ];
  return (
    <PageHeaderWrapper>
      <Card>
        <div style={{ marginBottom: "20px" }}>更新语料库：
          <UploadBox />
        </div>
        <div>编辑历史：<Table columns={columns} dataSource={data} /></div>
      </Card>
    </PageHeaderWrapper>
  )
}
export default Index