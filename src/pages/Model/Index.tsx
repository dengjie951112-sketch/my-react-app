import type { ConversationItemType } from '@ant-design/x'
import { useXConversations } from '@ant-design/x-sdk'
import { useState } from 'react'
import { ChatPanel } from './components/chat/Index.tsx'
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
const getDefaultMessages = (key: string) => {
  console.log(key, 'key')
  // 这里处理历史会话加载
  // return [
  //   {
  //     message: {
  //       role: 'assistant',
  //       content: `请输入您的问题！我来帮您解答${key}`,
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
    defaultActiveConversationKey: 'DJ',
  })

  // 处理点击"新对话"按钮
  const handleNewConversation = () => {
    setActiveConversationKey('DJ')
  }

  // 创建新会话
  const handleFirstMessage = (userMessage: string) => {
    // 生成新会话的唯一 key
    const newKey = `conversation_${Date.now()}`

    // 从用户消息中提取临时标题(前20个字符)
    const tempTitle =
      userMessage.substring(0, 20) + (userMessage.length > 20 ? '...' : '')

    // 创建新会话对象
    const newConversation = {
      key: newKey,
      label: tempTitle,
      group: '历史会话',
    }
    // 将新会话插入到列表最前面
    setConversations([newConversation, ...conversations])

    // 设置为当前活跃会话
    setActiveConversationKey(newKey)

    return newKey
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
          activeKey={activeConversationKey}
          onChange={setActiveConversationKey}
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
          />
        </div>
      </div>
    </div>
  )
}

export default Model
