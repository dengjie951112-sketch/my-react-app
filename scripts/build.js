#!/usr/bin/env node

/**
 * 构建脚本
 * 提供更多构建选项和优化
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// 构建配置
const buildConfig = {
  // 是否生成构建报告
  analyze: process.argv.includes('--analyze'),
  // 是否压缩
  compress: process.argv.includes('--compress'),
  // 构建环境
  mode: process.argv.includes('--dev') ? 'development' : 'production',
}

console.log('🚀 开始构建...')
console.log('📊 构建配置:', buildConfig)

try {
  // 清理dist目录
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true })
    console.log('🧹 已清理dist目录')
  }

  // 执行构建
  const buildCommand = `vite build --mode ${buildConfig.mode}`
  console.log('⚡ 执行构建命令:', buildCommand)

  execSync(buildCommand, { stdio: 'inherit' })

  // 构建完成后的处理
  console.log('✅ 构建完成!')

  // 显示构建结果
  if (fs.existsSync('dist')) {
    const distSize = getDirSize('dist')
    console.log(`📦 构建产物大小: ${formatBytes(distSize)}`)

    // 列出主要文件
    console.log('📁 主要文件:')
    listMainFiles('dist')
  }

  // 生成构建报告
  if (buildConfig.analyze) {
    console.log('📈 生成构建分析报告...')
    // 这里可以集成 rollup-plugin-visualizer 等工具
  }
} catch (error) {
  console.error('❌ 构建失败:', error.message)
  process.exit(1)
}

/**
 * 获取目录大小
 */
function getDirSize(dirPath) {
  let size = 0

  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath)

    if (stats.isFile()) {
      size += stats.size
    } else if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath)
      files.forEach(file => {
        calculateSize(path.join(currentPath, file))
      })
    }
  }

  calculateSize(dirPath)
  return size
}

/**
 * 格式化字节大小
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 列出主要文件
 */
function listMainFiles(dirPath) {
  const files = []

  function collectFiles(currentPath, relativePath = '') {
    const items = fs.readdirSync(currentPath)

    items.forEach(item => {
      const fullPath = path.join(currentPath, item)
      const relativeItemPath = path.join(relativePath, item)
      const stats = fs.statSync(fullPath)

      if (stats.isFile()) {
        files.push({
          path: relativeItemPath,
          size: stats.size,
        })
      } else if (stats.isDirectory()) {
        collectFiles(fullPath, relativeItemPath)
      }
    })
  }

  collectFiles(dirPath)

  // 按大小排序，显示前10个文件
  files
    .sort((a, b) => b.size - a.size)
    .slice(0, 10)
    .forEach(file => {
      console.log(`  ${file.path} (${formatBytes(file.size)})`)
    })
}
