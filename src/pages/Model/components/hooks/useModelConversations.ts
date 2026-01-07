import type { ConversationItemType } from '@ant-design/x'
import { useXConversations } from '@ant-design/x-sdk'
import { useCallback, useMemo, useRef, useState } from 'react'
import { migrateProviderCache } from './chatProvider'

type PendingMessage = { key: string; params: any } | null

export const useModelConversations = (
  defaultConversations: ConversationItemType[]
) => {
  const [collapsed, setCollapsed] = useState(false)
  const pendingMessageRef = useRef<PendingMessage>(null)
  const tempKeyToSessionIdRef = useRef<Map<string, string>>(new Map())

  const {
    conversations,
    activeConversationKey,
    setActiveConversationKey,
    setConversations,
  } = useXConversations({
    defaultConversations,
    defaultActiveConversationKey: '',
  })

  const handleNewConversation = useCallback(() => {
    setActiveConversationKey('')
    pendingMessageRef.current = null
  }, [setActiveConversationKey])

  const handleFirstMessage = useCallback(
    (userMessage: string, params: any) => {
      const tempKey = `temp_${Date.now()}`
      const tempTitle =
        userMessage.substring(0, 20) + (userMessage.length > 20 ? '...' : '')

      const newConversation = {
        key: tempKey,
        label: tempTitle,
        group: '历史会话',
      }

      setConversations([newConversation, ...conversations])
      pendingMessageRef.current = { key: tempKey, params }
      setActiveConversationKey(tempKey)

      return tempKey
    },
    [conversations, setActiveConversationKey, setConversations]
  )

  const handleSessionIdReceived = useCallback(
    (tempKey: string, sessionId: string, title?: string) => {
      if (tempKeyToSessionIdRef.current.has(tempKey)) {
        return
      }

      tempKeyToSessionIdRef.current.set(tempKey, sessionId)
      migrateProviderCache(tempKey, sessionId)

      setConversations(
        conversations.map((conv: ConversationItemType) =>
          conv.key === tempKey
            ? {
                ...conv,
                key: sessionId,
                label: title || conv.label,
              }
            : conv
        )
      )

      if (activeConversationKey === tempKey) {
        setActiveConversationKey(sessionId)
      }
    },
    [
      activeConversationKey,
      conversations,
      setActiveConversationKey,
      setConversations,
    ]
  )

  const pendingMessage = useMemo(() => {
    if (pendingMessageRef.current?.key === activeConversationKey) {
      return pendingMessageRef.current.params
    }
    return null
  }, [activeConversationKey])

  const clearPendingMessage = useCallback(() => {
    pendingMessageRef.current = null
  }, [])

  return {
    collapsed,
    setCollapsed,
    conversations,
    activeConversationKey,
    setActiveConversationKey,
    handleNewConversation,
    handleFirstMessage,
    handleSessionIdReceived,
    pendingMessage,
    clearPendingMessage,
  }
}

export const getDefaultMessages = (_key: string) => {
  return undefined
}
