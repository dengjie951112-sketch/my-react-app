import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  Typography,
  message,
} from 'antd'
import React, { useState } from 'react'
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

  // 获取登录前的页面路径，如果没有则默认跳转到dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard'

  // 模拟登录API调用
  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true)
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))

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

        message.success('登录成功！欢迎回来 🎉')

        // 触发认证状态变化事件
        window.dispatchEvent(new Event('authChange'))

        // 跳转到登录前的页面或dashboard
        setTimeout(() => {
          navigate(from, { replace: true })
        }, 500)
      } else {
        message.error('用户名或密码错误！请检查后重试')
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('登录失败:', error)
      message.error('登录失败，请稍后重试')
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
    message.info('已填充演示账号信息')
  }

  return (
    <div className="min-h-screen login-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        {/* Logo和标题区域 */}
        <div className="text-center mb-8">
          <div className="login-logo inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 cursor-pointer">
            <span className="text-2xl font-bold text-white">R</span>
          </div>
          <Title level={2} className="text-gray-900 mb-2 font-semibold">
            欢迎回来
          </Title>
          <Text className="text-gray-600">登录您的 React 应用账户</Text>
        </div>

        {/* 登录卡片 */}
        <Card
          className="login-card border-0 w-full"
          bodyStyle={{ padding: '32px' }}
        >
          <Form
            form={form}
            name="login"
            onFinish={handleLogin}
            autoComplete="off"
            size="large"
            layout="vertical"
            className="space-y-2"
          >
            <Form.Item
              label={
                <span className="text-gray-700 font-medium text-sm">
                  用户名
                </span>
              }
              name="username"
              rules={[
                { required: true, message: '请输入用户名!' },
                { min: 3, message: '用户名至少3个字符!' },
              ]}
              className="mb-4"
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="请输入用户名"
                className="h-11 rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-colors"
                style={{ fontSize: '14px' }}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-gray-700 font-medium text-sm">密码</span>
              }
              name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 6, message: '密码至少6个字符!' },
              ]}
              className="mb-4"
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="请输入密码"
                className="h-11 rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-colors"
                style={{ fontSize: '14px' }}
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item className="mb-6">
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-gray-600 text-sm">记住我</Checkbox>
                </Form.Item>
                <Link
                  to="/forgot-password"
                  className="text-blue-500 hover:text-blue-600 transition-colors text-sm"
                >
                  忘记密码？
                </Link>
              </div>
            </Form.Item>

            <Form.Item className="mb-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="login-button h-12 text-base font-medium rounded-lg"
              >
                {loading ? '登录中...' : '登录'}
              </Button>
            </Form.Item>
          </Form>

          <Divider className="my-6">
            <Text type="secondary" className="text-gray-500 text-xs">
              其他方式
            </Text>
          </Divider>

          {/* 演示账号按钮 */}
          <Button
            block
            className="demo-button mb-4 h-10 rounded-lg font-medium text-sm"
            onClick={fillDemoAccount}
          >
            🎯 使用演示账号
          </Button>

          {/* 注册链接 */}
          <div className="text-center">
            <Text className="text-gray-600 text-sm">
              还没有账户？{' '}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                立即注册
              </Link>
            </Text>
          </div>
        </Card>

        {/* 演示信息 */}
        <Card
          className="info-card mt-6"
          size="small"
          bodyStyle={{ padding: '16px' }}
        >
          <div className="text-center">
            <Text className="text-blue-800 text-xs font-medium">
              <strong>演示账号：</strong>admin / admin123
            </Text>
            <br />
            <Text className="text-blue-600 text-xs">
              使用上述账号可以体验登录功能
            </Text>
          </div>
        </Card>

        {/* 返回应用 */}
        <div className="text-center mt-6">
          <Link
            to="/dashboard"
            className="text-gray-500 hover:text-gray-700 text-xs transition-colors inline-flex items-center"
          >
            <span className="mr-1">←</span>
            返回应用
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
