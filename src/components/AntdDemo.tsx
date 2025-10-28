import {
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Bubble, Sender, Welcome } from '@ant-design/x'
import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Input,
  Progress,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Tag,
  Typography,
} from 'antd'
import React, { useState } from 'react'

const { Title, Text } = Typography
const { Option } = Select

const AntdDemo: React.FC = () => {
  const [switchValue, setSwitchValue] = useState(false)
  const [sliderValue, setSliderValue] = useState(30)
  const [rateValue, setRateValue] = useState(4)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Title level={1} className="text-center mb-8">
          🎉 Ant Design & Ant Design X 演示
        </Title>

        {/* Basic Components */}
        <Card title="基础组件" className="mb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Space direction="vertical" className="w-full">
                <Button type="primary" icon={<UserOutlined />}>
                  主要按钮
                </Button>
                <Button type="default" icon={<MailOutlined />}>
                  默认按钮
                </Button>
                <Button type="dashed" icon={<PhoneOutlined />}>
                  虚线按钮
                </Button>
                <Button type="link" icon={<HeartOutlined />}>
                  链接按钮
                </Button>
              </Space>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Space direction="vertical" className="w-full">
                <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
                <Input.Password placeholder="请输入密码" />
                <DatePicker placeholder="选择日期" className="w-full" />
                <Select placeholder="选择城市" className="w-full">
                  <Option value="beijing">北京</Option>
                  <Option value="shanghai">上海</Option>
                  <Option value="guangzhou">广州</Option>
                  <Option value="shenzhen">深圳</Option>
                </Select>
              </Space>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Space direction="vertical" className="w-full">
                <div>
                  <Text>开关控制: </Text>
                  <Switch
                    checked={switchValue}
                    onChange={setSwitchValue}
                    checkedChildren="开"
                    unCheckedChildren="关"
                  />
                </div>
                <div>
                  <Text>滑块值: {sliderValue}</Text>
                  <Slider
                    value={sliderValue}
                    onChange={setSliderValue}
                    max={100}
                  />
                </div>
                <div>
                  <Text>评分: </Text>
                  <Rate value={rateValue} onChange={setRateValue} />
                </div>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Display Components */}
        <Card title="展示组件" className="mb-6">
          <Space direction="vertical" className="w-full">
            <Alert
              message="成功提示"
              description="这是一个成功的提示信息，操作已完成。"
              type="success"
              showIcon
              closable
            />

            <div>
              <Text>进度条:</Text>
              <Progress percent={75} status="active" />
              <Progress percent={100} />
              <Progress percent={50} status="exception" />
            </div>

            <div>
              <Text>标签:</Text>
              <div className="mt-2">
                <Tag color="magenta">React</Tag>
                <Tag color="red">Ant Design</Tag>
                <Tag color="volcano">TypeScript</Tag>
                <Tag color="orange">Tailwind CSS</Tag>
                <Tag color="gold">Vite</Tag>
                <Tag color="lime">Modern</Tag>
                <Tag color="green">UI/UX</Tag>
                <Tag color="cyan">Components</Tag>
              </div>
            </div>
          </Space>
        </Card>

        {/* Ant Design X Components */}
        <Card title="Ant Design X - AI 聊天组件" className="mb-6">
          <div className="space-y-4">
            <Welcome
              variant="filled"
              icon="🤖"
              title="欢迎使用 AI 助手"
              description="我是你的智能助手，可以帮助你解答问题和完成任务。"
              extra="开始对话吧！"
            />

            <Divider />

            <div className="space-y-3">
              <Bubble
                content="你好！欢迎使用 Ant Design X 组件库。"
                avatar={{ src: '🤖' }}
                variant="filled"
              />

              <Bubble
                content="这些组件看起来很棒！我想了解更多关于 AI 聊天功能的信息。"
                avatar={{ src: '👤' }}
                variant="outlined"
              />

              <Bubble
                content="Ant Design X 提供了丰富的 AI 交互组件，包括聊天气泡、发送器、欢迎页面等，让你轻松构建现代化的 AI 应用界面。"
                avatar={{ src: '🤖' }}
                variant="filled"
              />
            </div>

            <Divider />

            <Sender
              placeholder="输入你的消息..."
              onSubmit={message => {
                // eslint-disable-next-line no-console
                console.log('发送消息:', message)
              }}
            />
          </div>
        </Card>

        {/* Feature Summary */}
        <Card title="功能总结" className="mb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Title level={4}>✨ Ant Design 特性</Title>
              <ul className="space-y-2">
                <li>🎨 丰富的组件库 (100+ 组件)</li>
                <li>🌈 企业级 UI 设计语言</li>
                <li>📱 响应式设计</li>
                <li>🎯 TypeScript 支持</li>
                <li>🌍 国际化支持</li>
                <li>🎪 主题定制</li>
              </ul>
            </Col>
            <Col xs={24} md={12}>
              <Title level={4}>🚀 Ant Design X 特性</Title>
              <ul className="space-y-2">
                <li>🤖 AI 聊天组件</li>
                <li>💬 对话气泡</li>
                <li>📝 消息发送器</li>
                <li>👋 欢迎页面</li>
                <li>🎭 多种样式变体</li>
                <li>⚡ 现代化交互体验</li>
              </ul>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}

export default AntdDemo
