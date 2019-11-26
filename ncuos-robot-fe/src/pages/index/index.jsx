import React, {useEffect, useState} from 'react';
import { Table, Card, Upload, message, Button, Icon, Modal, Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import style from './index.less'
import Request from '../../utils/apiUtils'

const { TextArea } = Input
class UploadBox extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
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
  // const [fileData, setFile] = useState()
  const props = {
    name: 'file',
    action: "http://guoxy.top/api/robot/file",
    method: "post",
    data: {
      file_name: 'test',
      file_description: 'nmsl'
    },
    headers: {
      ContentType: "application/json"
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
    <Upload {...props} style={{display: "inline-block"}}>
      <Button>
        <Icon type="upload" /> 上传文件
      </Button>
    </Upload>
  )
}
const Index = () => {
  const columns = [
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      render: text => <div>{text}</div>,
    },
    {
      title: '文件名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '上传时间',
      dataIndex: 'time',
      key: 'time',
    },
  ];
  const [lst, setLst] = useState()
  useEffect(() => {
    Request('api/robot/file').then(
      res => {
        setLst(res.data)
      }
    )
  }, [])

  return (
    <PageHeaderWrapper>
      <Card>
        <div style={{ marginBottom: "20px", display: "flex" }}>
          <span style={{display: "inline-block", marginBottom: "10px"}}>更新语料库：</span>
          <div>
            <UploadBox />
            <div>支持文件类型：excel</div>
          </div>
        </div>
        <div>
          <span style={{display: "inline-block", marginBottom: "10px"}}>编辑历史：</span>
          <Table columns={columns} dataSource={lst} />
        </div>
      </Card>
    </PageHeaderWrapper>
  )
}
export default Index