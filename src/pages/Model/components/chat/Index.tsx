import { Bubble, Sender } from '@ant-design/x'
import { useXChat } from '@ant-design/x-sdk'
import { type GetRef } from 'antd'
import { useEffect, useRef } from 'react'
import { providerFactory } from '../hooks/chatProvider'
import ChatInput from './ChatInput.tsx'

interface Props {
  conversationKey: string
  defaultMessages?: any[]
  onFirstMessage?: (userMessage: string, params: any) => string
  pendingMessage?: any | null
  onPendingMessageSent?: () => void
  onSessionIdReceived?: (
    tempKey: string,
    sessionId: string,
    title?: string
  ) => void
}

export const ChatPanel = ({
  conversationKey,
  defaultMessages,
  onFirstMessage,
  pendingMessage,
  onPendingMessageSent,
  onSessionIdReceived,
}: Props) => {
  // 当 conversationKey 为空字符串时，使用一个临时的 key 来初始化 useXChat
  const chatKey = conversationKey || 'temp_init'
  const { onRequest, messages, isRequesting, abort } = useXChat({
    provider: providerFactory(chatKey),
    conversationKey: chatKey,
    defaultMessages,
    requestPlaceholder: () => ({
      role: 'assistant',
      content: 'Thinking...',
    }),
    requestFallback: (_, { error }) => ({
      role: 'assistant',
      content: error.message,
    }),
  })

  const senderRef = useRef<GetRef<typeof Sender>>(null)
  const hasSentPendingMessageRef = useRef<string | null>(null)
  const processedSessionIdsRef = useRef<Set<string>>(new Set())

  // 处理消息发送
  const handleRequest = (params: any) => {
    if (
      conversationKey === '' &&
      onFirstMessage &&
      params.messages?.[0]?.content
    ) {
      // 创建新会话，并将消息参数传递给父组件暂存
      onFirstMessage(params.messages[0].content, params)
      return
    }

    // 已有会话，直接发送
    onRequest(params)
  }

  // 当组件挂载或conversationKey变化时，如果有暂存消息则发送
  useEffect(() => {
    if (pendingMessage && conversationKey && conversationKey !== '') {
      // 检查是否已经发送过这条暂存消息（通过conversationKey判断）
      if (hasSentPendingMessageRef.current === conversationKey) {
        return
      }

      const timer = setTimeout(() => {
        onRequest(pendingMessage)
        // 标记已发送
        hasSentPendingMessageRef.current = conversationKey
        // 通知父组件消息已发送，清空暂存
        onPendingMessageSent?.()
      }, 0)

      return () => {
        clearTimeout(timer)
      }
    } else if (conversationKey === '') {
      // 切换到空会话时，重置标记
      hasSentPendingMessageRef.current = null
    }
  }, [conversationKey, pendingMessage, onRequest, onPendingMessageSent])

  // 监听消息响应，提取 sessionId 和 title
  useEffect(() => {
    if (!messages || messages.length === 0 || !onSessionIdReceived) {
      return
    }

    // 查找第一个成功完成的助手消息，从中提取 sessionId
    const completedMessage = messages.find(
      msg =>
        msg.message.role === 'assistant' &&
        msg.status === 'success' &&
        msg.extraInfo
    )

    if (completedMessage?.extraInfo) {
      // 从 extraInfo 中提取 sessionId 和 title
      // 根据实际 API 响应结构调整这里的字段路径
      const sessionId =
        completedMessage.extraInfo.sessionId ||
        completedMessage.extraInfo.session_id ||
        completedMessage.extraInfo.id

      const title =
        completedMessage.extraInfo.title ||
        completedMessage.extraInfo.name ||
        completedMessage.extraInfo.label

      // 如果 conversationKey 是临时 key（以 temp_ 开头），且获取到了 sessionId
      if (
        conversationKey.startsWith('temp_') &&
        sessionId &&
        !processedSessionIdsRef.current.has(sessionId)
      ) {
        processedSessionIdsRef.current.add(sessionId)
        // 调用回调更新会话 key
        onSessionIdReceived(conversationKey, sessionId, title)
      }
    }
  }, [messages, conversationKey, onSessionIdReceived])

  useEffect(() => {
    senderRef.current?.clear()
  }, [conversationKey])
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-4">
      {conversationKey !== '' && (
        <div className="w-full flex-1 overflow-y-auto">
          <Bubble.List
            items={messages?.map(i => ({
              ...i.message,
              key: i.id,
              status: i.status,
              loading: i.status === 'loading',
              extraInfo: i.extraInfo,
            }))}
            role={{
              assistant: { placement: 'start' },
              user: { placement: 'end' },
            }}
          />
        </div>
      )}

      <div className="w-full flex items-center justify-center">
        <ChatInput
          conversationKey={conversationKey}
          handleRequest={handleRequest}
          messages={messages}
          abort={abort}
          isRequesting={isRequesting}
        />
      </div>
    </div>
  )
}
