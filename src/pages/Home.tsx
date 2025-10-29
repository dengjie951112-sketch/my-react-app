import {
  ApiOutlined,
  LoginOutlined,
  RocketOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import { Card, Typography } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

const { Title, Text } = Typography

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="flex space-x-8 mb-8">
        <a
          href="https://vite.dev"
          target="_blank"
          className="transition-transform hover:scale-110"
        >
          <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          className="transition-transform hover:scale-110"
        >
          <img
            src={reactLogo}
            className="h-24 w-24 animate-spin-slow"
            alt="React logo"
          />
        </a>
      </div>

      <Title level={1} className="text-center mb-8">
        🎉 React + Router + Ant Design
      </Title>

      <Card className="max-w-md w-full text-center shadow-lg mb-8">
        <button
          onClick={() => setCount(count => count + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
        >
          Count is {count}
        </button>
        <p className="text-gray-600 mb-4">
          Edit{' '}
          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
            src/pages/Home.tsx
          </code>{' '}
          and save to test HMR
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            ✅ Tailwind CSS
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            ⚡ Vite
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            ⚛️ React
          </span>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
            🐜 Ant Design
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
            🛣️ React Router
          </span>
        </div>
      </Card>

      {/* 导航卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl w-full">
        <Link to="/dashboard/antd-demo" className="block">
          <Card
            hoverable
            className="text-center h-full transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <ToolOutlined className="text-4xl text-blue-500 mb-4" />
            <Title level={4} className="mb-2">
              Ant Design 演示
            </Title>
            <Text type="secondary">
              探索丰富的 Ant Design 组件库，包括表单、按钮、图表等
            </Text>
          </Card>
        </Link>

        <Link to="/dashboard/api-demo" className="block">
          <Card
            hoverable
            className="text-center h-full transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <ApiOutlined className="text-4xl text-green-500 mb-4" />
            <Title level={4} className="mb-2">
              API 演示
            </Title>
            <Text type="secondary">
              体验 Axios 封装的双实例架构，支持内部和第三方API
            </Text>
          </Card>
        </Link>

        <Link to="/dashboard/about" className="block">
          <Card
            hoverable
            className="text-center h-full transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <RocketOutlined className="text-4xl text-purple-500 mb-4" />
            <Title level={4} className="mb-2">
              关于项目
            </Title>
            <Text type="secondary">了解项目架构、技术栈和开发指南</Text>
          </Card>
        </Link>

        <Link to="/login" className="block">
          <Card
            hoverable
            className="text-center h-full transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <LoginOutlined className="text-4xl text-orange-500 mb-4" />
            <Title level={4} className="mb-2">
              登录演示
            </Title>
            <Text type="secondary">体验完整的登录功能和用户认证流程</Text>
          </Card>
        </Link>
      </div>

      <Text type="secondary" className="mt-8 text-center max-w-md block">
        点击上方卡片探索不同功能模块，或者点击 Vite 和 React 图标了解更多！
      </Text>
    </div>
  )
}

export default Home
