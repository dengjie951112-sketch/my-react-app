import type { AxiosRequestConfig } from 'axios'

// Request类配置接口
export interface RequestOptions extends AxiosRequestConfig {
  /** 是否为内部API（处理统一返回体和token） */
  isInternal?: boolean
  /** 是否显示加载状态 */
  showLoading?: boolean
  /** 是否显示错误信息 */
  showError?: boolean
  /** 重试次数 */
  retries?: number
}

// 内部API默认配置
export const internalApiConfig: RequestOptions = {
  isInternal: true,
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 60000, // 60秒
  headers: {
    'Content-Type': 'application/json',
  },
  showLoading: true,
  showError: true,
}

// 第三方API默认配置
export const externalApiConfig: RequestOptions = {
  isInternal: false,
  timeout: 60000, // 60秒
  headers: {
    'Content-Type': 'application/json',
  },
  showLoading: true,
  showError: true,
}

// 文件上传配置
export const uploadConfig: RequestOptions = {
  isInternal: true,
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 60000, // 60秒
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  showLoading: true,
  showError: true,
}
