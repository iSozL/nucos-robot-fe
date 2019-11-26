import React from 'react';
import request from 'umi-request'

interface requestDatas {
  url: string;
  methods: string;
  data?: any; 
}
const Request = (props: requestDatas) => {
  return new Promise((resolve, reject) => {
    request(`http://guoxy.top/${props.url}`, {
      method: props.methods,
      data: props.data
    }).then((res) => {
      console.log(res)
    }).catch((rej) => {
      console.log(rej)
    })
  })
}
export default Request;