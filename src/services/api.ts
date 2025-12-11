import type { LoginRequest, LoginResponse } from '../types/api'
import { external, post } from '../utils/http'

/**
 * 用户相关API
 */
export class UserApi {
  // 用户登录
  static login(data: LoginRequest): Promise<LoginResponse> {
    return post<LoginResponse>('/auth/login', data)
  }

  // 用户登出
  static logout(): Promise<void> {
    return post<void>('/auth/logout')
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
}

// 导出内部API（处理统一返回体）
export const internalApi = {
  user: UserApi,
}

// 导出第三方API（直接返回原始数据）
export const thirdPartyApi = {
  github: {
    getUser: ThirdPartyApi.getGitHubUser,
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
