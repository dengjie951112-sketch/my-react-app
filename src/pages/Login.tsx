import {
  GithubOutlined,
  GoogleOutlined,
  LockOutlined,
  ThunderboltFilled,
  UserOutlined,
  WechatOutlined,
} from '@ant-design/icons'
import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Typography,
  message,
  theme,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/login.css'

const { Title, Text } = Typography

interface LoginFormValues {
  username: string
  password: string
  remember: boolean
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // 获取登录前的页面路径，如果没有则默认跳转到dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard'

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // 模拟登录API调用
  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true)
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1500))

      // 模拟登录验证
      if (values.username === 'admin' && values.password === 'admin123') {
        // 保存登录状态到localStorage
        const userInfo = {
          username: values.username,
          token: 'mock-jwt-token-' + Date.now(),
          loginTime: new Date().toISOString(),
        }

        if (values.remember) {
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          localStorage.setItem('rememberMe', 'true')
        } else {
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        }

        message.success({
          content: 'Access Granted. Welcome back, Commander.',
          style: { marginTop: '20vh' },
        })

        // 触发认证状态变化事件
        window.dispatchEvent(new Event('authChange'))

        // 跳转到登录前的页面或dashboard
        setTimeout(() => {
          navigate(from, { replace: true })
        }, 800)
      } else {
        message.error('Authentication Failed. Invalid credentials.')
      }
    } catch (error) {
      console.error('Login failed:', error)
      message.error('System Error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // 快速填充演示账号
  const fillDemoAccount = () => {
    form.setFieldsValue({
      username: 'admin',
      password: 'admin123',
      remember: true,
    })
    message.info('Demo credentials injected.')
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          <div
            className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600 blur-[120px] opacity-20 animate-float"
            style={{
              transform: `translate(${mousePosition.x * -2}px, ${mousePosition.y * -2}px)`,
            }}
          ></div>
          <div
            className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600 blur-[120px] opacity-20 animate-float"
            style={{
              animationDelay: '2s',
              transform: `translate(${mousePosition.x * -2}px, ${mousePosition.y * -2}px)`,
            }}
          ></div>
        </div>

        <div className="relative z-10 w-full max-w-md px-4">
          <div
            className="glass-card rounded-2xl p-8 md:p-10 transform transition-all duration-500 hover:scale-[1.01]"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
            }}
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6 shadow-lg shadow-blue-500/30">
                <ThunderboltFilled className="text-3xl text-white" />
              </div>
              <Title
                level={2}
                className="!text-white mb-2 !font-bold tracking-tight"
              >
                Nexus AI
              </Title>
              <Text className="text-gray-400 text-base">
                Initialize your session to continue
              </Text>
            </div>

            {/* Form */}
            <Form
              form={form}
              name="login"
              onFinish={handleLogin}
              autoComplete="off"
              size="large"
              layout="vertical"
              className="space-y-4"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                  className="glass-input h-12"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  className="glass-input h-12"
                />
              </Form.Item>

              <div className="flex items-center justify-between mb-6">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-gray-400">Remember me</Checkbox>
                </Form.Item>
                <Link
                  to="/forgot-password"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:opacity-90 transition-all shadow-lg shadow-blue-900/20 font-semibold text-lg"
                >
                  {loading ? 'Initializing...' : 'Connect'}
                </Button>
              </Form.Item>
            </Form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex justify-center space-x-6 mb-6">
                <Button
                  type="text"
                  shape="circle"
                  icon={<GithubOutlined />}
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                />
                <Button
                  type="text"
                  shape="circle"
                  icon={<GoogleOutlined />}
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                />
                <Button
                  type="text"
                  shape="circle"
                  icon={<WechatOutlined />}
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                />
              </div>

              <div className="text-center space-y-4">
                <Text className="text-gray-500 block">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Create Access
                  </Link>
                </Text>

                <Button
                  type="link"
                  onClick={fillDemoAccount}
                  className="text-gray-600 hover:text-gray-400 text-xs"
                >
                  Load Demo Credentials
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Text className="text-gray-600 text-xs">
              © 2024 Nexus AI Systems. Secure Connection Established.
            </Text>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Login
