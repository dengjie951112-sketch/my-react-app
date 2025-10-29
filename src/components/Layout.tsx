import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout as AntLayout, Button, Dropdown, Menu, Space, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getMenuItems, getPageTitle } from '../router'

const { Header, Sider, Content } = AntLayout

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // 检查登录状态
  useEffect(() => {
    const checkAuth = () => {
      const localUserInfo = localStorage.getItem('userInfo')
      const sessionUserInfo = sessionStorage.getItem('userInfo')

      if (localUserInfo) {
        setUserInfo(JSON.parse(localUserInfo))
      } else if (sessionUserInfo) {
        setUserInfo(JSON.parse(sessionUserInfo))
      }
    }

    checkAuth()
  }, [])

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('rememberMe')
    sessionStorage.removeItem('userInfo')
    setUserInfo(null)

    // 触发认证状态变化事件
    window.dispatchEvent(new Event('authChange'))

    navigate('/login', { replace: true })
  }

  // 用户菜单
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ]

  // 从路由配置生成菜单项
  const menuItems = getMenuItems().map(item => ({
    ...item,
    label: <Link to={item.key}>{item.label}</Link>,
  }))

  // 获取当前页面标题
  const pageTitle = getPageTitle(location.pathname)

  return (
    <AntLayout className="h-screen overflow-hidden">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="h-screen overflow-hidden"
      >
        <div className="demo-logo-vertical h-8 m-4 bg-gray-700 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {collapsed ? 'R' : 'React App'}
          </span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="h-full overflow-y-auto"
          style={{ height: 'calc(100vh - 64px)' }}
        />
      </Sider>
      <AntLayout className="h-screen overflow-hidden">
        <Header
          style={{
            padding: '0 24px 0 0',
            background: colorBgContainer,
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <h1 className="text-xl font-semibold text-gray-800 ml-4">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center">
            {userInfo ? (
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                arrow
              >
                <Button type="text" className="flex items-center">
                  <Space>
                    <UserOutlined />
                    <span>{userInfo.username}</span>
                  </Space>
                </Button>
              </Dropdown>
            ) : null}
          </div>
        </Header>
        <Content
          className="overflow-y-auto"
          style={{
            height: 'calc(100vh - 64px)',
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 'calc(100vh - 112px)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout
