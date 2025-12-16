import {
  DeepSeekChatProvider,
  type SSEFields,
  type XModelParams,
  type XModelResponse,
  XRequest,
} from '@ant-design/x-sdk'

const providerCaches = new Map<string, DeepSeekChatProvider>()
// Ant的模型
// export const providerFactory = (conversationKey: string) => {
//   if (!providerCaches.get(conversationKey)) {
//     providerCaches.set(
//       conversationKey,
//       new DeepSeekChatProvider({
//         request: XRequest<
//           XModelParams,
//           Partial<Record<SSEFields, XModelResponse>>
//         >('https://api.x.ant.design/api/big_model_glm-4.5-flash', {
//           manual: true,
//           params: {
//             thinking: { type: 'disabled' },
//             stream: true,
//             model: 'glm-4.5-flash',
//           },
//         }),
//       })
//     )
//   }
//   return providerCaches.get(conversationKey)!
// }

// deepseek的聊天模型
// export const providerFactory = (conversationKey: string) => {
//   if (!providerCaches.get(conversationKey)) {
//     providerCaches.set(
//       conversationKey,
//       new DeepSeekChatProvider({
//         request: XRequest<
//           XModelParams,
//           Partial<Record<SSEFields, XModelResponse>>
//         >('https://api.deepseek.com/chat/completions', {
//           manual: true,
//           params: {
//             // thinking: { type: 'disabled' },
//             stream: true,
//             model: 'deepseek-chat',
//           },
//           headers: {
//             Authorization: 'Bearer sk-0de67d89e781411d803b31eabbbc81f8',
//           },
//         }),
//       })
//     )
//   }
//   return providerCaches.get(conversationKey)!
// }

// deepseek的聊天思考模型
export const providerFactory = (conversationKey: string) => {
  if (!providerCaches.get(conversationKey)) {
    providerCaches.set(
      conversationKey,
      new DeepSeekChatProvider({
        request: XRequest<
          XModelParams,
          Partial<Record<SSEFields, XModelResponse>>
        >('https://api.deepseek.com/chat/completions', {
          manual: true,
          params: {
            // thinking: { type: 'disabled' },
            stream: true,
            model: 'deepseek-reasoner',
          },
          headers: {
            Authorization: 'Bearer sk-0de67d89e781411d803b31eabbbc81f8',
          },
        }),
      })
    )
  }
  return providerCaches.get(conversationKey)!
}

//openAI的标准
// export const providerFactory = (conversationKey: string) => {
//   if (!providerCaches.get(conversationKey)) {
//     providerCaches.set(
//       conversationKey,
//       new OpenAIChatProvider({
//         request: XRequest<
//           XModelParams,
//           Partial<Record<SSEFields, XModelResponse>>
//         >('https://api.deepseek.com/chat/completions', {
//           manual: true,
//           params: {
//             // thinking: { type: 'disabled' },
//             stream: true,
//             model: 'deepseek-reasoner',
//           },
//           headers: {
//             Authorization: 'Bearer sk-0de67d89e781411d803b31eabbbc81f8',
//           },
//         }),
//       })
//     )
//   }
//   return providerCaches.get(conversationKey)!
// }

// 当临时 key 更新为真实 sessionId 时，迁移 provider 缓存
export const migrateProviderCache = (tempKey: string, sessionId: string) => {
  const provider = providerCaches.get(tempKey)
  if (provider && !providerCaches.has(sessionId)) {
    providerCaches.set(sessionId, provider)
    providerCaches.delete(tempKey)
  }
}
