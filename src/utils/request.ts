import { message } from 'antd'
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import type { RequestOptions } from './request-config'
import { externalApiConfig, internalApiConfig } from './request-config'

// 请求配置接口
export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
  retries?: number
}

// 统一的Request类
export class Request {
  private instance: AxiosInstance
  private isInternal: boolean

  constructor(config: RequestOptions) {
    // 从配置中获取isInternal标志
    this.isInternal = config.isInternal ?? true

    // 创建axios实例
    this.instance = axios.create(config)

    // 设置拦截器
    this.setupInterceptors()
  }

  /**
   * 设置拦截器
   */
  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // 显示加载状态
        const customConfig = config as RequestConfig
        if (customConfig.showLoading !== false) {
          // 这里可以显示全局loading
          // eslint-disable-next-line no-console
          console.log(
            `Loading started... (${this.isInternal ? 'Internal' : 'External'} API)`
          )
        }

        return config
      },
      (error: any) => {
        // eslint-disable-next-line no-console
        console.error('Request error:', error)
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 隐藏加载状态
        // eslint-disable-next-line no-console
        console.log(
          `Loading finished... (${this.isInternal ? 'Internal' : 'External'} API)`
        )

        // 内部API处理统一返回体
        if (this.isInternal) {
          const { data } = response
          const customConfig = response.config as RequestConfig

          // 处理统一返回体格式
          const { code, message: msg, data: responseData } = data

          // 正常状态返回（根据你们的约定，code === 0 表示成功）
          if (code === 0) {
            // 直接返回data字段的内容
            return {
              ...response,
              data: responseData,
            }
          }

          // 处理业务错误
          const errorMessage = msg || '请求失败'

          if (customConfig.showError !== false) {
            message.error(errorMessage)
          }

          return Promise.reject(new Error(errorMessage))
        }

        // 第三方API直接返回原始响应
        return response
      },
      (error: any) => {
        // 隐藏加载状态
        // eslint-disable-next-line no-console
        console.log(
          `Loading finished... (${this.isInternal ? 'Internal' : 'External'} API)`
        )

        const customConfig = error.config as RequestConfig
        let errorMessage = '网络错误，请稍后重试'

        if (error.response) {
          const { status, data } = error.response

          switch (status) {
            case 400:
              errorMessage = data?.message || '请求参数错误'
              break
            case 401:
              errorMessage = '登录已过期，请重新登录'
              // 仅内部API处理token过期
              if (this.isInternal) {
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                // 这里可以跳转到登录页面
                // window.location.href = '/login'
              }
              break
            case 403:
              errorMessage = '没有权限访问该资源'
              break
            case 404:
              errorMessage = '请求的资源不存在'
              break
            case 500:
              errorMessage = '服务器内部错误'
              break
            case 502:
              errorMessage = '网关错误'
              break
            case 503:
              errorMessage = '服务暂时不可用'
              break
            default:
              errorMessage = data?.message || `请求失败 (${status})`
          }
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = '请求超时，请稍后重试'
        } else if (error.message === 'Network Error') {
          errorMessage = '网络连接失败，请检查网络'
        }

        // 显示错误信息
        if (customConfig?.showError !== false) {
          message.error(errorMessage)
        }

        // eslint-disable-next-line no-console
        console.error(
          `Response error (${this.isInternal ? 'Internal' : 'External'} API):`,
          error
        )
        return Promise.reject(error)
      }
    )
  }

  /**
   * GET 请求
   */
  async get<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
    config?: RequestConfig
  ): Promise<T> {
    const response: any = await this.instance.get(url, {
      params,
      ...config,
    })
    return response.data
  }

  /**
   * POST 请求
   */
  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const response: any = await this.instance.post(url, data, config)
    return response.data
  }

  /**
   * PUT 请求
   */
  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const response: any = await this.instance.put(url, data, config)
    return response.data
  }

  /**
   * DELETE 请求
   */
  async delete<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    const response: any = await this.instance.delete(url, config)
    return response.data
  }

  /**
   * PATCH 请求
   */
  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const response: any = await this.instance.patch(url, data, config)
    return response.data
  }

  /**
   * 上传文件
   */
  async upload<T = unknown>(
    url: string,
    file: File | FormData,
    config?: RequestConfig & {
      onUploadProgress?: (progressEvent: ProgressEvent) => void
    }
  ): Promise<T> {
    const formData = file instanceof FormData ? file : new FormData()
    if (file instanceof File) {
      formData.append('file', file)
    }

    const response: any = await this.instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    })
    return response.data
  }

  /**
   * 下载文件
   */
  async download(
    url: string,
    params?: Record<string, unknown>,
    filename?: string,
    config?: RequestConfig
  ): Promise<void> {
    const response = await this.instance.get(url, {
      params,
      responseType: 'blob',
      ...config,
    })

    // 创建下载链接
    const blob = new Blob([response.data])
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
  }

  /**
   * 获取完整响应（包含headers等信息）
   */
  async getFullResponse<T = unknown>(
    url: string,
    config?: RequestConfig
  ): Promise<AxiosResponse<T>> {
    return await this.instance.get(url, config)
  }

  /**
   * 并发请求
   */
  static async all<T = unknown>(requests: Promise<T>[]): Promise<T[]> {
    return await Promise.all(requests)
  }

  /**
   * 请求重试
   */
  async retry<T = unknown>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error

    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await requestFn()
      } catch (error) {
        lastError = error as Error
        if (i < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
        }
      }
    }

    throw lastError!
  }

  /**
   * 获取原始axios实例
   */
  getInstance(): AxiosInstance {
    return this.instance
  }
}

// 第三方接口导出Request实例
export const otherRequest = new Request(externalApiConfig)

// 默认导出Request实例（内部API）
export default new Request(internalApiConfig)
