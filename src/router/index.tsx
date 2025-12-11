import {
  ApiOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LoginOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import type { ReactNode } from 'react'
import About from '../pages/About'
import AntdDemo from '../pages/AntdDemo'
import ApiDemo from '../pages/ApiDemo'
import Home from '../pages/Home'
import Login from '../pages/Login/Index'
import NotFound from '../pages/NotFound'

export interface RouteConfig {
  path: string
  element: ReactNode
  title: string
  icon?: ReactNode
  hideInMenu?: boolean
  requireAuth?: boolean // 是否需要登录
}

// 路由配置
export const routes: RouteConfig[] = [
  {
    path: '/dashboard',
    element: <Home />,
    title: '首页',
    icon: <HomeOutlined />,
  },
  {
    path: '/dashboard/antd-demo',
    element: <AntdDemo />,
    title: 'Ant Design 演示',
    icon: <ToolOutlined />,
  },
  {
    path: '/dashboard/api-demo',
    element: <ApiDemo />,
    title: 'API 演示',
    icon: <ApiOutlined />,
  },
  {
    path: '/dashboard/about',
    element: <About />,
    title: '关于项目',
    icon: <InfoCircleOutlined />,
  },
  {
    path: '/login',
    element: <Login />,
    title: '登录',
    icon: <LoginOutlined />,
    hideInMenu: true, // 登录页面不显示在菜单中
  },
  {
    path: '*',
    element: <NotFound />,
    title: '页面未找到',
    hideInMenu: true,
  },
]

// 获取菜单项
export const getMenuItems = () => {
  return routes
    .filter(route => !route.hideInMenu && route.path !== '*')
    .map(route => ({
      key: route.path,
      icon: route.icon,
      label: route.title,
    }))
}

// 根据路径获取页面标题
export const getPageTitle = (pathname: string): string => {
  const route = routes.find(route => route.path === pathname)
  return route ? route.title : '未知页面'
}
