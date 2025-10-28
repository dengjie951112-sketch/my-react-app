// 导入Request类和相关类型
import { Request, type RequestConfig } from './request'
import type { RequestOptions } from './request-config'
import { externalApiConfig, internalApiConfig } from './request-config'

// 创建内部API实例（处理统一返回体）
const internalRequest = new Request(internalApiConfig)

// 创建第三方API实例（直接返回原始数据）
const externalRequest = new Request(externalApiConfig)

// 导出内部API便捷方法（默认）
export const get = internalRequest.get.bind(internalRequest)
export const post = internalRequest.post.bind(internalRequest)
export const put = internalRequest.put.bind(internalRequest)
export const del = internalRequest.delete.bind(internalRequest)
export const patch = internalRequest.patch.bind(internalRequest)
export const upload = internalRequest.upload.bind(internalRequest)
export const download = internalRequest.download.bind(internalRequest)

// 导出第三方API便捷方法
export const external = {
  get: externalRequest.get.bind(externalRequest),
  post: externalRequest.post.bind(externalRequest),
  put: externalRequest.put.bind(externalRequest),
  delete: externalRequest.delete.bind(externalRequest),
  patch: externalRequest.patch.bind(externalRequest),
  getFullResponse: externalRequest.getFullResponse.bind(externalRequest),
}

// 导出Request类
export { Request }

// 导出类型
export type { RequestConfig, RequestOptions }

// 默认导出内部API实例
export default internalRequest
