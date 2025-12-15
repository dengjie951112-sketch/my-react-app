import { Bubble, Sender } from '@ant-design/x'
import { useXChat } from '@ant-design/x-sdk'
import { type GetRef } from 'antd'
import { useEffect, useRef } from 'react'
import { providerFactory } from '../hooks/chatProvider'
import ChatInput from './ChatInput.tsx'

interface Props {
  conversationKey: string
  defaultMessages?: any[]
}

export const ChatPanel = ({ conversationKey, defaultMessages }: Props) => {
  const senderRef = useRef<GetRef<typeof Sender>>(null)

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

  useEffect(() => {
    senderRef.current?.clear()
  }, [conversationKey])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-4">
      {conversationKey && (
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
          onRequest={onRequest}
          abort={abort}
          isRequesting={isRequesting}
        />
      </div>
    </div>
  )
}
