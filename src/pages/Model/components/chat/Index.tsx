import { Bubble, Sender } from '@ant-design/x'
import { useXChat } from '@ant-design/x-sdk'
import { type GetRef } from 'antd'
import { useEffect, useRef } from 'react'
import { providerFactory } from '../hooks/chatProvider'
import ChatInput from './ChatInput.tsx'

interface Props {
  conversationKey: string
  defaultMessages?: any[]
  onFirstMessage?: (userMessage: string) => string
}

export const ChatPanel = ({
  conversationKey,
  defaultMessages,
  onFirstMessage,
}: Props) => {
  const { onRequest, messages, isRequesting, abort } = useXChat({
    provider: providerFactory(conversationKey),
    conversationKey,
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
  const pendingMessageRef = useRef<any>(null)
  // const hasMessages = mergedMessages.length > 0

  // 处理消息发送
  const handleRequest = (params: any) => {
    if (
      conversationKey === 'DJ' &&
      onFirstMessage &&
      params.messages?.[0]?.content
    ) {
      // 1. 暂存消息
      pendingMessageRef.current = params
      // 2. 创建新会话 (父组件会更新 conversationKey)
      onFirstMessage(params.messages[0].content)
      return
    }

    // 已有会话，直接发送
    onRequest(params)
  }

  // 监听 conversationKey 变化，如果有暂存的消息则补发
  useEffect(() => {
    if (conversationKey && pendingMessageRef.current) {
      const params = pendingMessageRef.current
      pendingMessageRef.current = null // 清空暂存

      setTimeout(() => {
        onRequest(params)
      }, 0)
    }
  }, [conversationKey, onRequest])

  useEffect(() => {
    senderRef.current?.clear()
  }, [conversationKey])
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-4">
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
