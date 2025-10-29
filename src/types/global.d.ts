// 全局类型声明文件

// Vite 环境变量类型定义
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_ENV: 'development' | 'production' | 'test'
  readonly VITE_ENABLE_MOCK: string
  readonly VITE_BUILD_COMPRESS: string
  readonly VITE_DROP_CONSOLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 全局常量类型定义
declare const __APP_VERSION__: string
declare const __BUILD_TIME__: string
declare const __DEV__: boolean
declare const __PROD__: boolean

// 扩展Window对象
declare interface Window {
  // 可以在这里添加挂载到window上的全局变量
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}

// 模块声明
declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}

declare module '*.ico' {
  const content: string
  export default content
}

declare module '*.bmp' {
  const content: string
  export default content
}

// CSS模块声明
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}
