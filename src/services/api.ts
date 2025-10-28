import type {
  LoginRequest,
  LoginResponse,
  PaginationResponse,
  User,
} from '../types/api'
import { del, external, get, post, put } from '../utils/http'

/**
 * 用户相关API
 */
export class UserApi {
  // 用户登录
  static login(data: LoginRequest): Promise<LoginResponse> {
    return post<LoginResponse>('/auth/login', data)
  }

  // 用户注册
  static register(data: {
    name: string
    email: string
    password: string
  }): Promise<User> {
    return post<User>('/auth/register', data)
  }

  // 获取用户信息
  static getUserInfo(): Promise<User> {
    return get<User>('/user/profile')
  }

  // 更新用户信息
  static updateUserInfo(data: Partial<User>): Promise<User> {
    return put<User>('/user/profile', data)
  }

  // 修改密码
  static changePassword(data: {
    oldPassword: string
    newPassword: string
  }): Promise<void> {
    return post<void>('/user/change-password', data)
  }

  // 用户登出
  static logout(): Promise<void> {
    return post<void>('/auth/logout')
  }

  // 刷新token
  static refreshToken(refreshToken: string): Promise<{ token: string }> {
    return post<{ token: string }>('/auth/refresh', { refreshToken })
  }

  // 获取用户列表（管理员）
  static getUserList(params: {
    page?: number
    pageSize?: number
    keyword?: string
  }): Promise<PaginationResponse<User>> {
    return get<PaginationResponse<User>>('/admin/users', params)
  }
}

/**
 * 文件上传API
 */
export class FileApi {
  // 上传单个文件
  static uploadFile(file: File): Promise<{ url: string; filename: string }> {
    return post<{ url: string; filename: string }>('/upload/file', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  // 上传多个文件
  static uploadFiles(
    files: File[]
  ): Promise<{ url: string; filename: string }[]> {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    return post<{ url: string; filename: string }[]>(
      '/upload/files',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  }

  // 删除文件
  static deleteFile(fileId: string): Promise<void> {
    return del<void>(`/upload/file/${fileId}`)
  }
}

/**
 * 通用API
 */
export class CommonApi {
  // 获取系统配置
  static getSystemConfig(): Promise<Record<string, unknown>> {
    return get<Record<string, unknown>>('/system/config')
  }

  // 获取字典数据
  static getDictData(type: string): Promise<
    Array<{
      label: string
      value: string | number
      disabled?: boolean
    }>
  > {
    return get<
      Array<{
        label: string
        value: string | number
        disabled?: boolean
      }>
    >(`/system/dict/${type}`)
  }

  // 发送验证码
  static sendVerifyCode(data: {
    email: string
    type: 'register' | 'reset' | 'login'
  }): Promise<void> {
    return post<void>('/common/send-code', data)
  }

  // 验证验证码
  static verifyCode(data: {
    email: string
    code: string
    type: 'register' | 'reset' | 'login'
  }): Promise<boolean> {
    return post<boolean>('/common/verify-code', data)
  }
}

/**
 * 第三方API服务（直接返回原始数据）
 */
export class ThirdPartyApi {
  // GitHub API示例
  static getGitHubUser(username: string): Promise<any> {
    return external.get(`https://api.github.com/users/${username}`)
  }

  // JSONPlaceholder API示例
  static getJsonPlaceholderPosts(): Promise<any[]> {
    return external.get('https://jsonplaceholder.typicode.com/posts')
  }

  static getJsonPlaceholderPost(id: number): Promise<any> {
    return external.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  }

  static createJsonPlaceholderPost(data: {
    title: string
    body: string
    userId: number
  }): Promise<any> {
    return external.post('https://jsonplaceholder.typicode.com/posts', data)
  }

  // 天气API示例（需要替换为实际的API key）
  static getWeather(city: string, apiKey?: string): Promise<any> {
    const key = apiKey || 'your-api-key'
    return external.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    )
  }

  // 汇率API示例
  static getExchangeRates(baseCurrency = 'USD'): Promise<any> {
    return external.get(
      `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
    )
  }

  // IP地址查询API示例
  static getIpInfo(ip?: string): Promise<any> {
    const url = ip ? `https://ipapi.co/${ip}/json/` : 'https://ipapi.co/json/'
    return external.get(url)
  }
}

// 导出内部API（处理统一返回体）
export const internalApi = {
  user: UserApi,
  file: FileApi,
  common: CommonApi,
}

// 导出第三方API（直接返回原始数据）
export const thirdPartyApi = {
  github: {
    getUser: ThirdPartyApi.getGitHubUser,
  },
  jsonplaceholder: {
    getPosts: ThirdPartyApi.getJsonPlaceholderPosts,
    getPost: ThirdPartyApi.getJsonPlaceholderPost,
    createPost: ThirdPartyApi.createJsonPlaceholderPost,
  },
  weather: {
    getCurrent: ThirdPartyApi.getWeather,
  },
  exchange: {
    getRates: ThirdPartyApi.getExchangeRates,
  },
  ip: {
    getInfo: ThirdPartyApi.getIpInfo,
  },
}

// 导出所有API
export const api = {
  // 内部API（默认）
  ...internalApi,
  // 第三方API
  external: thirdPartyApi,
}

export default api
