# React AI 应用

这是一个基于现代前端技术栈构建的 React 应用，集成了 AI 聊天组件和完整的 HTTP 请求封装。

## 🚀 技术栈

### 核心框架

- **React 19.1.1** - 现代化的前端框架，支持最新特性
- **TypeScript 5.9.3** - 提供类型安全和更好的开发体验
- **Vite 7.1.7** - 快速的构建工具和开发服务器

### UI 组件库

- **Ant Design 5.27.5** - 企业级 UI 设计语言和组件库
- **Ant Design X 1.6.1** - AI 聊天组件库，提供现代化的对话界面
- **Ant Design Icons 6.1.0** - 丰富的图标库
- **Tailwind CSS 4.1.14** - 实用优先的 CSS 框架

### HTTP 请求

- **Axios 1.12.2** - 强大的 HTTP 客户端
- **双实例架构** - 分别处理内部 API 和第三方 API 请求
- **统一返回体处理** - 自动处理业务错误码和数据格式
- **文件上传下载** - 支持进度监控的文件操作

### 开发工具

- **ESLint 9.36.0** - 代码质量检查
- **Prettier 3.6.2** - 代码格式化
- **PostCSS 8.5.6** - CSS 处理工具
- **Autoprefixer 10.4.21** - 自动添加 CSS 前缀

### 构建和部署

- **Vite Plugin React 5.0.4** - React 支持插件
- **TypeScript ESLint** - TypeScript 代码检查
- **PNPM** - 高效的包管理器

## ✨ 主要特性

### 🎨 UI 组件展示

- 完整的 Ant Design 组件演示
- AI 聊天界面组件 (Ant Design X)
- 响应式设计和现代化 UI

### 🌐 HTTP 请求封装

- **双实例架构**：
  - 内部 API 实例：处理统一返回体格式 `{code, message, data}`
  - 第三方 API 实例：直接返回原始数据
- **功能特性**：
  - 自动 Token 认证
  - 请求/响应拦截器
  - Loading 状态管理
  - 错误统一处理
  - 文件上传下载
  - TypeScript 类型支持

### 🔧 开发体验

- TypeScript 全栈类型支持
- ESLint + Prettier 代码规范
- Vite 热更新开发服务器
- 模块化项目结构

## 📁 项目结构

```text
src/
├── components/          # React 组件
│   ├── AntdDemo.tsx    # Ant Design 组件演示
│   └── ApiDemo.tsx     # HTTP 请求演示
├── services/           # API 服务层
│   └── api.ts         # API 接口定义
├── utils/             # 工具函数
│   ├── http.ts        # HTTP 请求封装
│   ├── request.ts     # 请求类实现
│   └── request-config.ts # 请求配置
├── types/             # TypeScript 类型定义
├── config/            # 配置文件
└── assets/            # 静态资源
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

### 代码检查和格式化

```bash
# 代码检查
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# 代码格式化
pnpm format

# 检查代码格式
pnpm format:check

# 类型检查
pnpm type-check

# 全面检查（类型 + 代码规范 + 格式）
pnpm check-all
```

## 📖 使用示例

### HTTP 请求示例

```typescript
// 内部 API 请求（自动处理统一返回体）
import { get, post } from '@/utils/http'
import api from '@/services/api'

// 直接使用 HTTP 工具
const userData = await get('/users/profile')

// 使用 API 服务
const loginResult = await api.user.login({
  email: 'user@example.com',
  password: 'password123',
})

// 第三方 API 请求（返回原始数据）
import { external } from '@/utils/http'

const posts = await external.get('https://jsonplaceholder.typicode.com/posts')
```

### AI 聊天组件示例

```tsx
import { Bubble, Sender, Welcome } from '@ant-design/x'

// 欢迎组件
<Welcome
  variant="filled"
  icon="🤖"
  title="欢迎使用 AI 助手"
  description="我是你的智能助手，可以帮助你解答问题和完成任务。"
/>

// 聊天气泡
<Bubble
  content="你好！欢迎使用 Ant Design X 组件库。"
  avatar={{ src: '🤖' }}
  variant="filled"
/>

// 消息发送器
<Sender
  placeholder="输入你的消息..."
  onSubmit={(message) => console.log('发送消息:', message)}
/>
```

## 🔧 配置说明

### 环境配置

项目支持多环境配置，可在 `src/config/env.ts` 中设置不同环境的 API 地址和其他配置。

### HTTP 请求配置

- **内部 API**：自动添加认证 token，处理统一返回体格式
- **第三方 API**：直接返回原始数据，适用于调用外部服务

### 样式配置

- 使用 Tailwind CSS 进行样式开发
- Ant Design 主题可在组件中自定义
- PostCSS 自动处理 CSS 兼容性

## 📚 技术文档

### React Compiler

React Compiler 在此项目中未启用，因为它会影响开发和构建性能。如需添加，请参考 [官方文档](https://react.dev/learn/react-compiler/installation)。

### ESLint 配置扩展

项目已配置完整的 ESLint 规则，包括：

- TypeScript 类型检查
- React 最佳实践
- Prettier 代码格式化
- 可访问性检查 (jsx-a11y)
- Import 规则检查

如需启用更严格的类型检查规则，可以在 `eslint.config.js` 中添加：

```js
// 启用类型感知的 lint 规则
tseslint.configs.recommendedTypeChecked,
// 或使用更严格的规则
tseslint.configs.strictTypeChecked,
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [React](https://reactjs.org/) - 用户界面构建库
- [Ant Design](https://ant.design/) - 企业级 UI 设计语言
- [Ant Design X](https://x.ant.design/) - AI 聊天组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Axios](https://axios-http.com/) - 基于 Promise 的 HTTP 客户端
