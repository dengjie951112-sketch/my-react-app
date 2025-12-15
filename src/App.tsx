import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthGuard from './components/AuthGuard'
import Layout from './components/Layout'
import About from './pages/About'
import AntdDemo from './pages/AntdDemo'
import ApiDemo from './pages/ApiDemo'
import Home from './pages/Home'
import Login from './pages/Login/Index'
import Model from './pages/Model/Index'
import NotFound from './pages/NotFound'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 默认重定向到登录页 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 登录页面（无需认证） */}
        <Route path="/login" element={<Login />} />
        {/* 模型问答 */}
        <Route path="/model" element={<Model />} />

        {/* 需要认证的页面路由 */}
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Layout />
            </AuthGuard>
          }
        >
          <Route index element={<Home />} />
          <Route path="antd-demo" element={<AntdDemo />} />
          <Route path="api-demo" element={<ApiDemo />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* 404页面 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
