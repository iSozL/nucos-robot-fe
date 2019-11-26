import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Request from '../../utils/apiUtils'

const Pendding = () => {
  useEffect(() => {
    Request({url:'/api/robot/todo', methods:'get'})
  })
  return (
    <PageHeaderWrapper>
      <div>nmsl</div>
    </PageHeaderWrapper>
  )
}
export default Pendding
