import { Form, message } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import './login.css'
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const submit = (values: any) => {
    setLoading(true)
    // 模拟登录验证
    if (values.username === 'admin' && values.password === 'admin123') {
      // 保存登录状态到localStorage
      const userInfo = {
        username: values.username,
        token: 'mock-jwt-token-' + Date.now(),
        loginTime: new Date().toISOString(),
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      message.success({
        content: 'Access Granted. Welcome back, Commander.',
        style: { marginTop: '20vh' },
      })

      // 触发认证状态变化事件
      window.dispatchEvent(new Event('authChange'))

      // 跳转到登录前的页面或dashboard
      setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, 800)
    } else {
      message.error('Authentication Failed. Invalid credentials.')
    }
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 login-background">
      <div className="flex flex-col items-center py-6 bg-white w-[450px] rounded-2xl">
        <div className="text-3xl font-bold mb-6">Agent AI</div>
        <div className="w-full px-10">
          <LoginForm form={form} loading={loading} onFinish={submit} />
        </div>
      </div>
    </div>
  )
}

export default Login
