import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import {
  createVitePlugins,
  getBuildOptimization,
  getProxyConfig,
} from './vite.plugins'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  const isBuild = command === 'build'

  return {
    plugins: createVitePlugins(env),

    // 开发服务器配置
    server: {
      port: Number(env.VITE_DEV_PORT) || 5173,
      host: true, // 允许外部访问
      open: true, // 自动打开浏览器
      cors: true, // 启用CORS
      proxy: getProxyConfig(),
      // 开发服务器性能优化
      fs: {
        strict: true,
      },
    },

    // 预览服务器配置
    preview: {
      port: Number(env.VITE_PREVIEW_PORT) || 4173,
      host: true,
      cors: true,
    },

    // 路径别名配置
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@services': resolve(__dirname, 'src/services'),
        '@types': resolve(__dirname, 'src/types'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@config': resolve(__dirname, 'src/config'),
      },
    },

    // 构建配置
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: env.VITE_GENERATE_SOURCEMAP === 'true',
      minify: isBuild ? 'terser' : false,
      target: 'es2015',
      ...getBuildOptimization(),
    },

    // CSS配置
    css: {
      devSourcemap: !isBuild,
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
        less: {
          modifyVars: {
            // Ant Design主题定制
            '@primary-color': '#1890ff',
            '@border-radius-base': '8px',
          },
          javascriptEnabled: true,
        },
      },
      // PostCSS配置会从postcss.config.js读取
    },

    // 依赖优化
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'antd',
        '@ant-design/icons',
        '@ant-design/x',
        'axios',
      ],
      exclude: ['@vitejs/plugin-react'],
      // 强制预构建
      force: false,
    },

    // 环境变量配置
    envPrefix: 'VITE_',

    // 定义全局常量
    define: {
      __APP_VERSION__: JSON.stringify(
        process.env.npm_package_version || '1.0.0'
      ),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __DEV__: !isBuild,
      __PROD__: isBuild,
    },

    // ESBuild配置
    esbuild: {
      // 生产环境移除console和debugger
      drop:
        isBuild && env.VITE_DROP_CONSOLE === 'true'
          ? ['console', 'debugger']
          : [],
      // 纯函数标记
      pure: isBuild ? ['console.log', 'console.info'] : [],
    },

    // 性能配置
    clearScreen: false, // 不清屏，保持日志
    logLevel: 'info', // 日志级别
  }
})
