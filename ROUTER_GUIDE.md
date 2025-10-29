# 🛣️ React Router 使用指南

## 📋 概述

项目已成功集成 React Router 7.9.4，实现了完整的单页应用路由系统。

## 🏗️ 路由架构

### 文件结构

```
src/
├── router/
│   └── index.tsx          # 路由配置文件
├── components/
│   └── Layout.tsx         # 布局组件（包含侧边栏导航）
├── pages/                 # 页面组件目录
│   ├── Home.tsx          # 首页
│   ├── AntdDemo.tsx      # Ant Design 演示页
│   ├── ApiDemo.tsx       # API 演示页
│   ├── About.tsx         # 关于页面
│   └── NotFound.tsx      # 404 页面
└── App.tsx               # 路由根配置
```

### 路由配置

项目采用集中式路由配置，所有路由定义在 `src/router/index.tsx` 中：

```typescript
export interface RouteConfig {
  path: string // 路由路径
  element: ReactNode // 页面组件
  title: string // 页面标题
  icon?: ReactNode // 菜单图标
  hideInMenu?: boolean // 是否在菜单中隐藏
}
```

## 🎯 当前路由

| 路径         | 页面            | 描述                       |
| ------------ | --------------- | -------------------------- |
| `/`          | 首页            | 项目介绍和导航卡片         |
| `/antd-demo` | Ant Design 演示 | 展示 Ant Design 组件       |
| `/api-demo`  | API 演示        | 展示 Axios 封装和 API 调用 |
| `/about`     | 关于项目        | 项目技术栈和架构说明       |
| `*`          | 404 页面        | 未找到页面的友好提示       |

## 🚀 使用方法

### 1. 添加新页面

1. 在 `src/pages/` 目录下创建新的页面组件：

```typescript
// src/pages/NewPage.tsx
import React from 'react'

const NewPage: React.FC = () => {
  return (
    <div>
      <h1>新页面</h1>
    </div>
  )
}

export default NewPage
```

2. 在 `src/router/index.tsx` 中添加路由配置：

```typescript
import NewPage from '../pages/NewPage'

export const routes: RouteConfig[] = [
  // ... 现有路由
  {
    path: '/new-page',
    element: <NewPage />,
    title: '新页面',
    icon: <YourIcon />,
  },
]
```

### 2. 页面导航

使用 React Router 的 `Link` 组件进行导航：

```typescript
import { Link } from 'react-router-dom'

// 在组件中使用
<Link to="/antd-demo">前往 Ant Design 演示</Link>
```

或者使用编程式导航：

```typescript
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

// 导航到指定页面
navigate('/api-demo')

// 返回上一页
navigate(-1)

// 替换当前页面（不会在历史记录中留下记录）
navigate('/home', { replace: true })
```

### 3. 获取路由信息

```typescript
import { useLocation, useParams } from 'react-router-dom'

// 获取当前位置信息
const location = useLocation()
console.log(location.pathname) // 当前路径

// 获取路由参数（如果有）
const params = useParams()
```

## 🎨 布局系统

项目使用嵌套路由结构，所有页面都包含在 `Layout` 组件中：

- **侧边栏导航**：自动从路由配置生成菜单项
- **动态标题**：根据当前路由显示页面标题
- **响应式设计**：支持移动端和桌面端
- **折叠菜单**：侧边栏可以折叠以节省空间

## 🔧 高级功能

### 路由守卫

如需添加路由守卫（如登录验证），可以创建高阶组件：

```typescript
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  isAuthenticated: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated
}) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}
```

### 懒加载

对于大型应用，可以使用 React.lazy 实现页面懒加载：

```typescript
import { lazy } from 'react'

const LazyPage = lazy(() => import('../pages/LazyPage'))

// 在路由配置中使用 Suspense
{
  path: '/lazy-page',
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyPage />
    </Suspense>
  ),
  title: '懒加载页面',
}
```

## 📱 移动端适配

布局组件已经适配移动端：

- 小屏幕下侧边栏自动折叠
- 响应式菜单设计
- 触摸友好的交互

## 🎯 最佳实践

1. **页面组件命名**：使用 PascalCase，如 `UserProfile.tsx`
2. **路由路径**：使用 kebab-case，如 `/user-profile`
3. **页面标题**：保持简洁明了
4. **图标选择**：使用 Ant Design Icons 保持一致性
5. **错误处理**：为每个页面添加错误边界

## 🔍 调试技巧

1. 使用 React Developer Tools 查看路由状态
2. 在浏览器控制台查看 `window.location` 对象
3. 使用 `useLocation` hook 调试路由信息

## 🚀 启动项目

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问应用
# http://localhost:5173
```

现在你可以通过侧边栏导航或直接在地址栏输入路径来访问不同的页面！
