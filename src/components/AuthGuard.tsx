import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface AuthGuardProps {
  children: React.ReactNode
}

// 检查用户是否已登录
const isAuthenticated = (): boolean => {
  const localUserInfo = localStorage.getItem('userInfo')
  const sessionUserInfo = sessionStorage.getItem('userInfo')

  if (localUserInfo || sessionUserInfo) {
    try {
      const userInfo = JSON.parse(localUserInfo || sessionUserInfo || '{}')
      // 检查token是否存在且有效
      return !!(userInfo.token && userInfo.username)
    } catch {
      return false
    }
  }

  return false
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const location = useLocation()

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated()
      setIsAuth(authenticated)
    }

    checkAuth()

    // 监听storage变化，实时更新认证状态
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener('storage', handleStorageChange)

    // 自定义事件监听，用于同一页面内的登录状态变化
    const handleAuthChange = () => {
      checkAuth()
    }

    window.addEventListener('authChange', handleAuthChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authChange', handleAuthChange)
    }
  }, [])

  // 加载中状态
  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">检查登录状态...</p>
        </div>
      </div>
    )
  }

  // 未登录则重定向到登录页，并保存当前路径
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 已登录则渲染子组件
  return <>{children}</>
}

export default AuthGuard

// 导出认证检查函数供其他组件使用
export { isAuthenticated }
