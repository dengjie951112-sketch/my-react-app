import { Form, message } from 'antd'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// 定义表单数据接口
export interface LoginFormValues {
  username: string
  password: string
  remember: boolean
}

/**
 * useLogin Hook
 *
 * @description 封装登录相关的逻辑，类似于 Vue Composition API 中的 setup() 部分逻辑抽离。
 * 在 Vue 中，你可能会创建一个 useLogin.ts 文件，导出一个函数包含 const loading = ref(false) 等。
 * React Hook 的思想是一致的：封装状态 (useState) 和副作用 (useEffect, 路由跳转等)，并导出给组件使用。
 */
export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()

  // 获取登录前的页面路径，如果没有则默认跳转到dashboard
  const from = (location.state as any)?.from?.pathname || '/model'

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
      // eslint-disable-next-line no-console
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
    message.info('登录成功.')
  }

  return {
    loading,
    form,
    handleLogin,
    fillDemoAccount,
  }
}
