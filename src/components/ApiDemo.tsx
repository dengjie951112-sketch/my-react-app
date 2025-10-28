import {
  ApiOutlined,
  LoginOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Divider,
  Input,
  Space,
  Typography,
  Upload,
  message,
} from 'antd'
import React, { useState } from 'react'
import api, { thirdPartyApi } from '../services/api'
import { external, get, upload } from '../utils/http'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

const ApiDemo: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<unknown>(null)

  // 测试内部API GET请求（会处理统一返回体）
  const testInternalGet = async () => {
    setLoading(true)
    try {
      // 模拟内部API调用（这会失败，因为没有真实后端）
      const data = await get('/users/profile')
      setResponse(data)
      message.success('内部API GET请求成功')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('内部API GET请求失败:', error)
      setResponse({ error: '内部API请求失败（预期行为，因为没有真实后端）' })
      message.warning('内部API请求失败（预期行为）')
    } finally {
      setLoading(false)
    }
  }

  // 测试第三方API GET请求（直接返回原始数据）
  const testExternalGet = async () => {
    setLoading(true)
    try {
      // 使用第三方API
      const data = await external.get(
        'https://jsonplaceholder.typicode.com/posts/1'
      )
      setResponse(data)
      message.success('第三方API GET请求成功')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('第三方API GET请求失败:', error)
      message.error('第三方API GET请求失败')
    } finally {
      setLoading(false)
    }
  }

  // 测试第三方API POST请求
  const testExternalPost = async () => {
    setLoading(true)
    try {
      const data = await external.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title: 'Test Post',
          body: 'This is a test post',
          userId: 1,
        }
      )
      setResponse(data)
      message.success('第三方API POST请求成功')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('第三方API POST请求失败:', error)
      message.error('第三方API POST请求失败')
    } finally {
      setLoading(false)
    }
  }

  // 测试GitHub API
  const testGitHubApi = async () => {
    setLoading(true)
    try {
      const data = await thirdPartyApi.github.getUser('octocat')
      setResponse(data)
      message.success('GitHub API请求成功')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('GitHub API请求失败:', error)
      message.error('GitHub API请求失败')
    } finally {
      setLoading(false)
    }
  }

  // 测试IP信息API
  const testIpApi = async () => {
    setLoading(true)
    try {
      const data = await thirdPartyApi.ip.getInfo()
      setResponse(data)
      message.success('IP信息API请求成功')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('IP信息API请求失败:', error)
      message.error('IP信息API请求失败')
    } finally {
      setLoading(false)
    }
  }

  // 测试登录API
  const testLogin = async () => {
    setLoading(true)
    try {
      // 这里是模拟登录，实际项目中会连接真实API
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      }

      // 注意：这个API调用会失败，因为没有真实的后端
      // 但可以看到请求的结构和错误处理
      const data = await api.user.login(loginData)
      setResponse(data)
      message.success('登录成功')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('登录失败:', error)
      setResponse({ error: '登录API调用失败（预期行为，因为没有真实后端）' })
      message.warning('登录API调用失败（这是预期的，因为没有真实后端）')
    } finally {
      setLoading(false)
    }
  }

  // 测试文件上传
  const testUpload = async (file: File) => {
    setLoading(true)
    try {
      // 这里是模拟上传，实际项目中会连接真实API
      const data = await upload('/upload', file, {
        showLoading: false,
        showError: false,
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          // eslint-disable-next-line no-console
          console.log(`上传进度: ${percent}%`)
        },
      })
      setResponse(data)
      message.success('文件上传成功')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('文件上传失败:', error)
      setResponse({ error: '文件上传失败（预期行为，因为没有真实后端）' })
      message.warning('文件上传失败（这是预期的，因为没有真实后端）')
    } finally {
      setLoading(false)
    }
    return false // 阻止默认上传行为
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Title level={1} className="text-center mb-8">
          🚀 Axios 封装演示
        </Title>

        <Alert
          message="双实例架构说明"
          description="这个演示展示了两套axios实例：1) 内部API实例 - 处理统一返回体格式(code/message/data)；2) 第三方API实例 - 直接返回原始数据。可以根据不同的API类型选择合适的实例。"
          type="info"
          showIcon
          className="mb-6"
        />

        {/* 内部API演示 */}
        <Card title="内部API请求（统一返回体处理）" className="mb-6">
          <div className="mb-4">
            <Text type="secondary">
              内部API会自动处理统一返回体格式：
              {`{ code: 0, message: 'success', data: {...} }`}
            </Text>
          </div>
          <Space wrap>
            <Button
              type="primary"
              icon={<ApiOutlined />}
              loading={loading}
              onClick={testInternalGet}
            >
              内部API GET
            </Button>
            <Button
              type="default"
              icon={<LoginOutlined />}
              loading={loading}
              onClick={testLogin}
            >
              用户登录
            </Button>
            <Button
              type="default"
              icon={<UserOutlined />}
              loading={loading}
              onClick={async () => {
                setLoading(true)
                try {
                  const data = await api.user.getUserInfo()
                  setResponse(data)
                  message.success('获取用户信息成功')
                } catch {
                  setResponse({ error: '获取用户信息失败（预期行为）' })
                  message.warning('获取用户信息失败（预期行为）')
                } finally {
                  setLoading(false)
                }
              }}
            >
              获取用户信息
            </Button>
          </Space>
        </Card>

        {/* 第三方API演示 */}
        <Card title="第三方API请求（直接返回原始数据）" className="mb-6">
          <div className="mb-4">
            <Text type="secondary">
              第三方API直接返回原始响应数据，不做任何格式处理
            </Text>
          </div>
          <Space wrap>
            <Button
              type="primary"
              icon={<ApiOutlined />}
              loading={loading}
              onClick={testExternalGet}
            >
              JSONPlaceholder GET
            </Button>
            <Button
              type="default"
              icon={<ApiOutlined />}
              loading={loading}
              onClick={testExternalPost}
            >
              JSONPlaceholder POST
            </Button>
            <Button type="default" loading={loading} onClick={testGitHubApi}>
              GitHub API
            </Button>
            <Button type="default" loading={loading} onClick={testIpApi}>
              IP信息API
            </Button>
          </Space>
        </Card>

        {/* 文件上传演示 */}
        <Card title="文件上传" className="mb-6">
          <Upload
            beforeUpload={testUpload}
            showUploadList={false}
            accept="image/*,.pdf,.doc,.docx"
          >
            <Button icon={<UploadOutlined />} loading={loading}>
              选择文件上传
            </Button>
          </Upload>
          <Text type="secondary" className="ml-2">
            支持图片、PDF、Word文档
          </Text>
        </Card>

        {/* 响应结果显示 */}
        {response && (
          <Card title="响应结果" className="mb-6">
            <TextArea
              value={JSON.stringify(response, null, 2)}
              rows={10}
              readOnly
              style={{ fontFamily: 'monospace' }}
            />
          </Card>
        )}

        {/* 使用示例代码 */}
        <Card title="使用示例代码" className="mb-6">
          <Paragraph>
            <Title level={4}>1. 内部API请求（统一返回体处理）</Title>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{`import { get, post, put, del } from '@/utils/http'
import api from '@/services/api'

// 直接使用HTTP工具类（会自动处理统一返回体）
const userData = await get('/users/profile')  // 直接返回data字段内容

// 使用API服务类
const loginResult = await api.user.login({
  email: 'user@example.com',
  password: 'password123'
})

// 后端返回格式：{ code: 0, message: 'success', data: { user: {...}, token: '...' } }
// 前端接收到的：{ user: {...}, token: '...' }`}</code>
            </pre>
          </Paragraph>

          <Divider />

          <Paragraph>
            <Title level={4}>2. 第三方API请求（原始数据返回）</Title>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{`import { external } from '@/utils/http'
import { thirdPartyApi } from '@/services/api'

// 直接使用第三方HTTP工具类
const posts = await external.get('https://jsonplaceholder.typicode.com/posts')

// 使用第三方API服务类
const githubUser = await thirdPartyApi.github.getUser('octocat')
const ipInfo = await thirdPartyApi.ip.getInfo()

// 返回完整的第三方API响应数据，不做任何处理`}</code>
            </pre>
          </Paragraph>

          <Divider />

          <Paragraph>
            <Title level={4}>3. 两种实例的区别</Title>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{`// 内部API实例 - 处理统一返回体
import { internalRequest } from '@/utils/request'
const response1 = await internalRequest.get('/users')
// 自动处理：{ code: 0, message: 'success', data: [...] } → 返回 [...]

// 第三方API实例 - 直接返回原始数据  
import { externalRequest } from '@/utils/request'
const response2 = await externalRequest.get('https://api.github.com/users/octocat')
// 直接返回：{ login: 'octocat', id: 1, ... }`}</code>
            </pre>
          </Paragraph>

          <Divider />

          <Paragraph>
            <Title level={4}>4. 配置选项</Title>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{`// 自定义配置（两种实例都支持）
const data = await get('/api/data', params, {
  showLoading: false,  // 不显示loading
  showError: false,    // 不显示错误提示
  timeout: 5000,       // 5秒超时
})

const externalData = await external.get('https://api.example.com/data', params, {
  showLoading: true,   // 显示loading
  showError: true,     // 显示错误提示
})`}</code>
            </pre>
          </Paragraph>
        </Card>

        {/* 功能特性 */}
        <Card title="双实例架构特性" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Title level={5}>🏢 内部API实例</Title>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>自动处理统一返回体格式</li>
                <li>自动添加认证token</li>
                <li>业务错误码处理</li>
                <li>统一错误提示</li>
                <li>Loading状态管理</li>
                <li>Token过期自动处理</li>
              </ul>
            </div>
            <div>
              <Title level={5}>🌐 第三方API实例</Title>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>直接返回原始响应数据</li>
                <li>不添加认证token</li>
                <li>保持第三方API原始格式</li>
                <li>独立的错误处理</li>
                <li>支持跨域请求</li>
                <li>更长的超时时间</li>
              </ul>
            </div>
          </div>

          <Divider />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Title level={5}>🔧 通用功能</Title>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>请求/响应拦截器</li>
                <li>请求超时配置</li>
                <li>请求重试机制</li>
                <li>并发请求支持</li>
                <li>TypeScript类型支持</li>
                <li>环境配置管理</li>
              </ul>
            </div>
            <div>
              <Title level={5}>📁 文件操作</Title>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>文件上传（单个/多个）</li>
                <li>上传进度监控</li>
                <li>文件下载</li>
                <li>文件类型验证</li>
                <li>文件大小限制</li>
                <li>拖拽上传支持</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ApiDemo
