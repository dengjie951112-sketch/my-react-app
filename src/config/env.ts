// 环境配置
export const env = {
  // API基础URL
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',

  // 应用信息
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'My React App',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',

  // 环境信息
  NODE_ENV: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,

  // 功能开关
  USE_MOCK: import.meta.env.VITE_USE_MOCK === 'true',
}

// 开发环境配置
export const devConfig = {
  API_BASE_URL: 'http://localhost:3000/api',
  ENABLE_CONSOLE: true,
  ENABLE_DEVTOOLS: true,
}

// 生产环境配置
export const prodConfig = {
  API_BASE_URL: 'https://api.yourdomain.com',
  ENABLE_CONSOLE: false,
  ENABLE_DEVTOOLS: false,
}

// 根据环境获取配置
export const getConfig = () => {
  if (env.IS_DEV) {
    return { ...env, ...devConfig }
  }
  return { ...env, ...prodConfig }
}

export default getConfig()
