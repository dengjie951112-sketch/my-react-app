import {
  ApiOutlined,
  BugOutlined,
  CodeOutlined,
  GithubOutlined,
  RocketOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import { Card, Col, Divider, Row, Tag, Timeline, Typography } from 'antd'
import React from 'react'

const { Title, Paragraph, Text } = Typography

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Title level={1} className="text-center mb-8">
        📚 关于项目
      </Title>

      {/* 项目概述 */}
      <Card className="mb-6">
        <Title level={2}>🎯 项目概述</Title>
        <Paragraph>
          这是一个现代化的 React 应用模板，集成了当前最流行的前端技术栈。
          项目采用 TypeScript 开发，使用 Vite 作为构建工具，集成了 Ant Design
          组件库和 Tailwind CSS 样式框架，并配置了完整的路由系统。
        </Paragraph>
        <Paragraph>
          项目特别注重开发体验和代码质量，配置了 ESLint、Prettier、 以及完整的
          TypeScript 类型检查，确保代码的一致性和可维护性。
        </Paragraph>
      </Card>

      {/* 技术栈 */}
      <Card className="mb-6">
        <Title level={2}>🛠️ 技术栈</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Title level={4}>核心框架</Title>
            <div className="space-y-2">
              <Tag icon={<RocketOutlined />} color="blue" className="mb-2">
                React 19.1.1
              </Tag>
              <Tag icon={<CodeOutlined />} color="blue" className="mb-2">
                TypeScript 5.9.3
              </Tag>
              <Tag icon={<ApiOutlined />} color="green" className="mb-2">
                Vite 7.1.7
              </Tag>
              <Tag icon={<GithubOutlined />} color="purple" className="mb-2">
                React Router 7.9.4
              </Tag>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Title level={4}>UI & 样式</Title>
            <div className="space-y-2">
              <Tag icon={<ToolOutlined />} color="red" className="mb-2">
                Ant Design 5.27.5
              </Tag>
              <Tag icon={<ToolOutlined />} color="orange" className="mb-2">
                Ant Design X 1.6.1
              </Tag>
              <Tag color="cyan" className="mb-2">
                Tailwind CSS 4.1.14
              </Tag>
              <Tag color="geekblue" className="mb-2">
                PostCSS 8.5.6
              </Tag>
            </div>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Title level={4}>HTTP & 工具</Title>
            <div className="space-y-2">
              <Tag color="volcano" className="mb-2">
                Axios 1.12.2
              </Tag>
              <Tag color="gold" className="mb-2">
                pnpm 10.18.3
              </Tag>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Title level={4}>代码质量</Title>
            <div className="space-y-2">
              <Tag icon={<BugOutlined />} color="magenta" className="mb-2">
                ESLint 9.36.0
              </Tag>
              <Tag color="purple" className="mb-2">
                Prettier 3.6.2
              </Tag>
              <Tag color="lime" className="mb-2">
                TypeScript ESLint
              </Tag>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 项目特性 */}
      <Card className="mb-6">
        <Title level={2}>✨ 项目特性</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Title level={4}>开发体验</Title>
            <ul className="space-y-2">
              <li>🔥 Vite 热更新，开发体验极佳</li>
              <li>📝 完整的 TypeScript 类型支持</li>
              <li>🎨 ESLint + Prettier 代码格式化</li>
              <li>🚀 现代化的 React 19 特性</li>
              <li>📦 pnpm 包管理，速度更快</li>
              <li>🔧 完善的开发工具配置</li>
            </ul>
          </Col>
          <Col xs={24} md={12}>
            <Title level={4}>UI/UX</Title>
            <ul className="space-y-2">
              <li>🐜 Ant Design 企业级组件库</li>
              <li>🤖 Ant Design X AI 聊天组件</li>
              <li>🎯 Tailwind CSS 原子化样式</li>
              <li>📱 响应式设计支持</li>
              <li>🎪 主题定制能力</li>
              <li>🌈 丰富的图标库</li>
            </ul>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Title level={4}>网络请求</Title>
            <ul className="space-y-2">
              <li>🌐 双 Axios 实例架构</li>
              <li>🔒 内部 API 统一返回体处理</li>
              <li>🌍 第三方 API 原始数据返回</li>
              <li>📤 文件上传下载支持</li>
              <li>⚡ 请求拦截器和错误处理</li>
              <li>🔄 自动重试和超时配置</li>
            </ul>
          </Col>
          <Col xs={24} md={12}>
            <Title level={4}>路由系统</Title>
            <ul className="space-y-2">
              <li>🛣️ React Router 7 最新版本</li>
              <li>📄 页面级代码分割</li>
              <li>🔗 声明式路由配置</li>
              <li>🎯 嵌套路由支持</li>
              <li>🔐 路由守卫机制</li>
              <li>📱 移动端友好导航</li>
            </ul>
          </Col>
        </Row>
      </Card>

      {/* 开发时间线 */}
      <Card className="mb-6">
        <Title level={2}>📅 开发时间线</Title>
        <Timeline
          items={[
            {
              color: 'green',
              children: (
                <div>
                  <Text strong>项目初始化</Text>
                  <br />
                  <Text type="secondary">
                    使用 Vite + React + TypeScript 创建项目基础架构
                  </Text>
                </div>
              ),
            },
            {
              color: 'blue',
              children: (
                <div>
                  <Text strong>UI 框架集成</Text>
                  <br />
                  <Text type="secondary">
                    集成 Ant Design + Tailwind CSS，配置主题和样式系统
                  </Text>
                </div>
              ),
            },
            {
              color: 'purple',
              children: (
                <div>
                  <Text strong>网络层架构</Text>
                  <br />
                  <Text type="secondary">
                    设计双 Axios 实例架构，支持内部和第三方 API 调用
                  </Text>
                </div>
              ),
            },
            {
              color: 'orange',
              children: (
                <div>
                  <Text strong>AI 组件演示</Text>
                  <br />
                  <Text type="secondary">
                    集成 Ant Design X，展示现代化 AI 聊天界面组件
                  </Text>
                </div>
              ),
            },
            {
              color: 'red',
              children: (
                <div>
                  <Text strong>路由系统</Text>
                  <br />
                  <Text type="secondary">
                    配置 React Router，实现页面级路由和导航系统
                  </Text>
                </div>
              ),
            },
            {
              color: 'cyan',
              children: (
                <div>
                  <Text strong>代码质量</Text>
                  <br />
                  <Text type="secondary">
                    配置 ESLint、Prettier 和 TypeScript 严格模式
                  </Text>
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* 快速开始 */}
      <Card className="mb-6">
        <Title level={2}>🚀 快速开始</Title>
        <Paragraph>
          <Title level={4}>安装依赖</Title>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>pnpm install</code>
          </pre>
        </Paragraph>

        <Paragraph>
          <Title level={4}>启动开发服务器</Title>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>pnpm dev</code>
          </pre>
        </Paragraph>

        <Paragraph>
          <Title level={4}>构建生产版本</Title>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>pnpm build</code>
          </pre>
        </Paragraph>

        <Paragraph>
          <Title level={4}>代码检查和格式化</Title>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>{`pnpm lint        # 代码检查
pnpm lint:fix    # 自动修复
pnpm format      # 格式化代码
pnpm type-check  # 类型检查
pnpm check-all   # 全面检查`}</code>
          </pre>
        </Paragraph>
      </Card>

      {/* 项目结构 */}
      <Card className="mb-6">
        <Title level={2}>📁 项目结构</Title>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
          <code>{`src/
├── components/          # 可复用组件
│   ├── AntdDemo.tsx    # Ant Design 演示组件
│   └── ApiDemo.tsx     # API 演示组件
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   └── About.tsx       # 关于页面
├── services/           # API 服务
│   └── api.ts          # API 接口定义
├── utils/              # 工具函数
│   ├── http.ts         # HTTP 请求封装
│   ├── request.ts      # 请求实例配置
│   └── request-config.ts # 请求配置
├── types/              # TypeScript 类型定义
│   └── api.ts          # API 类型
├── config/             # 配置文件
│   └── env.ts          # 环境配置
├── assets/             # 静态资源
│   └── react.svg       # 图标文件
├── App.tsx             # 应用根组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式`}</code>
        </pre>
      </Card>
    </div>
  )
}

export default About
