// API 响应的通用接口
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
  success: boolean
  timestamp?: number
}

// 分页响应接口
export interface PaginationResponse<T = unknown> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 请求配置接口
export interface RequestConfig {
  showLoading?: boolean
  showError?: boolean
  timeout?: number
  retries?: number
}

// 错误响应接口
export interface ApiError {
  code: number
  message: string
  details?: unknown
}

// 用户信息接口示例
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: string
  createdAt: string
  updatedAt: string
}

// 登录请求接口
export interface LoginRequest {
  email: string
  password: string
  remember?: boolean
}

// 登录响应接口
export interface LoginResponse {
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}
