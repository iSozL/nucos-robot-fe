import React from 'react';
import request from 'umi-request'

const Request = (url: string, method: string, data: any) => {
  return new Promise((resolve, reject) => {
    request(`http://guoxy.top/${url}`, {
      method: method,
      data: data
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
export default Request;