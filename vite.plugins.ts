import react from '@vitejs/plugin-react'
import type { PluginOption } from 'vite'

/**
 * 创建Vite插件配置
 * @param env 环境变量
 * @returns 插件数组
 */
export function createVitePlugins(env: Record<string, string>): PluginOption[] {
  const plugins: PluginOption[] = [
    // React插件
    react({
      // 启用React Fast Refresh
      fastRefresh: true,
    }),
  ]

  // 开发环境插件
  if (env.NODE_ENV === 'development') {
    // 可以添加开发环境专用插件
    // 例如：mock插件、API文档生成等
  }

  // 生产环境插件
  if (env.NODE_ENV === 'production') {
    // 可以添加生产环境专用插件
    // 例如：打包分析、压缩优化等
  }

  return plugins
}

/**
 * 获取代理配置
 */
export function getProxyConfig() {
  return {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ''),
      // 配置代理日志
      configure: (proxy: any) => {
        proxy.on('error', (err: any) => {
          console.log('proxy error', err)
        })
        proxy.on('proxyReq', (proxyReq: any, req: any) => {
          console.log('Sending Request to the Target:', req.method, req.url)
        })
        proxy.on('proxyRes', (proxyRes: any, req: any) => {
          console.log(
            'Received Response from the Target:',
            proxyRes.statusCode,
            req.url
          )
        })
      },
    },
    // WebSocket代理
    '/ws': {
      target: 'ws://localhost:3000',
      ws: true,
      changeOrigin: true,
    },
  }
}

/**
 * 获取构建优化配置
 */
export function getBuildOptimization() {
  return {
    // 代码分割策略
    rollupOptions: {
      output: {
        manualChunks: {
          // React生态
          'react-vendor': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],

          // UI库
          'antd-vendor': ['antd'],
          'antd-icons': ['@ant-design/icons'],
          'antd-x': ['@ant-design/x'],

          // 工具库
          'utils-vendor': ['axios', 'dayjs', 'lodash-es'],

          // 图表库（如果使用）
          // 'charts-vendor': ['echarts', '@ant-design/plots'],
        },

        // 文件命名策略
        chunkFileNames: chunkInfo => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            if (facadeModuleId.includes('node_modules')) {
              return 'vendor/[name]-[hash].js'
            }
            if (facadeModuleId.includes('src/pages')) {
              return 'pages/[name]-[hash].js'
            }
            if (facadeModuleId.includes('src/components')) {
              return 'components/[name]-[hash].js'
            }
          }
          return 'js/[name]-[hash].js'
        },

        entryFileNames: 'js/[name]-[hash].js',

        assetFileNames: assetInfo => {
          const info = assetInfo.name?.split('.') || []
          let extType = info[info.length - 1]

          // 根据文件类型分类
          if (
            /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(
              assetInfo.name || ''
            )
          ) {
            extType = 'media'
          } else if (
            /\.(png|jpe?g|gif|svg|webp|ico|bmp)(\?.*)?$/i.test(
              assetInfo.name || ''
            )
          ) {
            extType = 'images'
          } else if (
            /\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name || '')
          ) {
            extType = 'fonts'
          } else if (
            /\.(css|scss|sass|less)(\?.*)?$/i.test(assetInfo.name || '')
          ) {
            extType = 'css'
          }

          return `${extType}/[name]-[hash].[ext]`
        },
      },
    },

    // 压缩配置将使用默认设置

    // 其他构建选项
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
    assetsInlineLimit: 4096, // 小于4kb的资源内联为base64
  }
}
