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
  // messagesMap[conversationKey]
  return [
    {
      message: { role: 'assistant', content: `Welcome to ${key}` },
      status: 'success',
    },
  ]
}
const Model: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { conversations, activeConversationKey, setActiveConversationKey } =
    useXConversations({
      defaultConversations: items,
      defaultActiveConversationKey: '',
    })

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
          />
        </div>
      </div>
    </div>
  )
}

export default Model
