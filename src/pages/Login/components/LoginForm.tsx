import type { FormInstance } from 'antd'
import { Button, Form, Input } from 'antd'
import React from 'react'
interface LoginFormProps {
  form: FormInstance
  onFinish: (values: any) => void
  loading: boolean
}
const LoginForm: React.FC<LoginFormProps> = ({ form, onFinish, loading }) => {
  return (
    <Form
      form={form}
      name="login"
      onFinish={onFinish}
      autoComplete="off"
      size="large"
      layout="vertical"
      className="space-y-4"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" className="glass-input h-12" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password placeholder="请输入密码" className="glass-input h-12" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:opacity-90 transition-all shadow-lg shadow-blue-900/20 font-semibold text-lg"
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
