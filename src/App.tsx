import { ApiOutlined, RocketOutlined, ToolOutlined } from '@ant-design/icons'
import { Card, Tabs, Typography } from 'antd'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import AntdDemo from './components/AntdDemo'
import ApiDemo from './components/ApiDemo'
import viteLogo from '/vite.svg'

const { Title, Text } = Typography

function App() {
  const [count, setCount] = useState(0)

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <RocketOutlined />
          原始演示
        </span>
      ),
      children: (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
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
            Vite + React + Tailwind + Ant Design
          </Title>

          <Card className="max-w-md w-full text-center shadow-lg">
            <button
              onClick={() => setCount(count => count + 1)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
            >
              Count is {count}
            </button>
            <p className="text-gray-600 mb-4">
              Edit{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                src/App.tsx
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
            </div>
          </Card>

          <Text type="secondary" className="mt-8 text-center max-w-md block">
            Click on the Vite and React logos to learn more. This page now
            includes Ant Design components!
          </Text>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <ToolOutlined />
          Ant Design 演示
        </span>
      ),
      children: <AntdDemo />,
    },
    {
      key: '3',
      label: (
        <span>
          <ApiOutlined />
          Axios 演示
        </span>
      ),
      children: <ApiDemo />,
    },
  ]

  return (
    <div className="min-h-screen">
      <Tabs
        defaultActiveKey="2"
        items={tabItems}
        size="large"
        className="px-4 pt-4"
      />
    </div>
  )
}

export default App
