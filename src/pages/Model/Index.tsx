import type { ConversationItemType } from '@ant-design/x'
import { useXConversations } from '@ant-design/x-sdk'
import { useRef, useState } from 'react'
import { ChatPanel } from './components/chat/Index.tsx'
import { migrateProviderCache } from './components/hooks/chatProvider'
import LeftSider from './components/Sider.tsx'
const items: ConversationItemType[] = [
  {
    key: `1`,
    label: `制造业企业推荐`,
    group: '历史会话',
  },
  {
    key: `2`,
    label: `安徽省食品企业推荐Top10`,
    group: '历史会话',
  },
  {
    key: `3`,
    label: `监听盒子宽度变化`,
    group: '历史会话',
  },
  {
    key: `4`,
    label: 'react和react-dom的解析',
    group: '历史会话',
  },
  {
    key: '5',
    label: 'getBoundingClientRect的作用',
    group: '历史会话',
  },
  {
    key: '6',
    label: 'react和vue的区别',
    group: '历史会话',
  },
  {
    key: '7',
    label: 'AISDK的文档解读',
    group: '历史会话',
  },
  {
    key: '8',
    label: 'Docker和Kubernetes的基础知识',
    group: '历史会话',
  },
]
const getDefaultMessages = (_key: string) => {
  // 这里处理历史会话加载
  // return [
  //   {
  //     message: {
  //       role: 'assistant',
  //       content: `请输入您的问题！我来帮您解答${_key}`,
  //     },
  //     status: 'success',
  //   },
  // ]
  return undefined
}
const Model: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    conversations,
    activeConversationKey,
    setActiveConversationKey,
    setConversations,
  } = useXConversations({
    defaultConversations: items,
    defaultActiveConversationKey: '',
  })

  /**
   * 用于暂存待发送的消息，key为新的conversationKey
   * pendingMessageRef 为什么需要这个变量
   * 初始化的时候，页面上是没有问答区域的，也就是没有选中对话，conversationKey是一个临时会话，
   * 当发送消息之后，我会生成一个真实的会话，conversationKey变成真实会话之后，会触发子组件的重新渲染，这个时候需要保存这个参数，不能直接发送接口请求
   * 要等DOM挂载完成之后，拿这个参数去请求
   */
  const pendingMessageRef = useRef<{ key: string; params: any } | null>(null)

  // 临时 key 到真实 sessionId 的映射
  const tempKeyToSessionIdRef = useRef<Map<string, string>>(new Map())

  // 处理点击"新对话"按钮
  const handleNewConversation = () => {
    setActiveConversationKey('')
    pendingMessageRef.current = null // 清空暂存消息
  }

  // 创建新会话
  const handleFirstMessage = (userMessage: string, params: any) => {
    // 生成临时会话的唯一 key
    const tempKey = `temp_${Date.now()}`

    // 从用户消息中提取临时标题(前20个字符)
    const tempTitle =
      userMessage.substring(0, 20) + (userMessage.length > 20 ? '...' : '')

    // 创建新会话对象（使用临时 key）
    const newConversation = {
      key: tempKey,
      label: tempTitle,
      group: '历史会话',
    }
    // 将新会话插入到列表最前面
    setConversations([newConversation, ...conversations])

    // 暂存消息，等待conversationKey更新后再发送
    pendingMessageRef.current = { key: tempKey, params }

    // 设置为当前活跃会话
    setActiveConversationKey(tempKey)

    return tempKey
  }

  // 当收到模型响应中的 sessionId 时，更新会话 key
  const handleSessionIdReceived = (
    tempKey: string,
    sessionId: string,
    title?: string
  ) => {
    // 如果这个临时 key 已经处理过，直接返回
    if (tempKeyToSessionIdRef.current.has(tempKey)) {
      return
    }

    // 记录映射关系
    tempKeyToSessionIdRef.current.set(tempKey, sessionId)

    // 迁移 provider 缓存
    migrateProviderCache(tempKey, sessionId)

    // 更新会话列表中的 key 和 title
    const updatedConversations = conversations.map(conv => {
      if (conv.key === tempKey) {
        return {
          ...conv,
          key: sessionId,
          label: title || conv.label, // 如果有 title 则使用，否则保持原标题
        }
      }
      return conv
    })
    setConversations(updatedConversations as any)

    // 如果当前活跃会话是这个临时 key，则更新为真实的 sessionId
    if (activeConversationKey === tempKey) {
      setActiveConversationKey(sessionId)
    }
  }

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div
        className={`h-full bg-[#f9f9f9] pt-1 border-r border-[#e5e5e5] transition-all duration-300 overflow-hidden ${
          collapsed ? 'w-0 border-none' : 'w-[280px]'
        }`}
      >
        <LeftSider
          onCollapse={() => setCollapsed(true)}
          conversations={conversations as ConversationItemType[]}
          activeKey={activeConversationKey || ''}
          onChange={(key: string) => setActiveConversationKey(key)}
          onNewConversation={handleNewConversation}
        />
      </div>
      <div className="w-0 flex-1 h-full relative">
        {collapsed && (
          <div
            className="absolute top-4 left-4 cursor-pointer z-10"
            onClick={() => setCollapsed(false)}
          >
            <i className="iconfont icon-zhankai"></i>
          </div>
        )}
        <div className="w-[888px] h-full m-auto px-10">
          <ChatPanel
            conversationKey={activeConversationKey}
            defaultMessages={getDefaultMessages(activeConversationKey)}
            onFirstMessage={handleFirstMessage}
            pendingMessage={
              pendingMessageRef.current?.key === activeConversationKey
                ? pendingMessageRef.current.params
                : null
            }
            onPendingMessageSent={() => {
              pendingMessageRef.current = null
            }}
            onSessionIdReceived={handleSessionIdReceived}
          />
        </div>
      </div>
    </div>
  )
}

export default Model
