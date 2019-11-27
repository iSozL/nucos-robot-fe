import React, {useEffect, useState} from 'react';
import { Table, Card, Upload, message, Button, Icon, Modal, Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import style from './index.less'
import Request from '../../utils/apiUtils'

const { TextArea } = Input
class UploadFiles extends React.Component {
  state = {
    fileList: [],
    uploading: false,
    file_name: "",
    description: "",
  };
  setDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  };
  setFilename = (e) => {
    this.setState({
      file_name: e.target.value
    })
  };
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
    });
    formData.append('file_name', this.state.file_name)
    formData.append('description', this.state.description)
    this.setState({
      uploading: true,
    });
    if (this.state.file_name && this.state.description) {
      Request('api/robot/file', 'post', formData).then(
        res => {
          this.setState({
            fileList: [],
            uploading: false,
          });
          if (res.status === 0) {
            message.success(res.message);
          } else {
            message.error(res.message)
          }
        },
        err => {
          message.error(err.message.toString())
        }
      )
    } else {
      message.error("请上传完整信息")
      this.setState({
        uploading: false,
      });
    }
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
        this.setState({
          uploading: false
        })
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <div style={{fontWeight: 1000, marginBottom: 10}}>
          文件名称: <Input placeholder="文件名称" style={{width: 200,marginLeft: 20}} onChange={this.setFilename} />
        </div>
        <div style={{fontWeight: 1000, marginBottom: 20}}>
          文件描述: <TextArea placeholder="不多于20字" style={{width: 200, marginLeft: 20}} autosize={{maxRows: 2}} maxLength="20" onChange={this.setDescription} />
        </div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> 选择文件
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? '上传中' : '开始上传'}
        </Button>
      </div>
    );
  }
}
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
            <UploadFiles />
          </div>
        </Modal>
      </div>
    );
  }
}
const Index = () => {
  const columns = [
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
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
        if (res.status === 0) {
          message.success(res.message)
        } else {
          message.error(res.message)
        }
      },
      err => {
        message.error(err.message.toString())
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