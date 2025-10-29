import { HomeOutlined } from '@ant-design/icons'
import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Link to="/">
            <Button type="primary" icon={<HomeOutlined />}>
              返回首页
            </Button>
          </Link>
        }
      />
    </div>
  )
}

export default NotFound
