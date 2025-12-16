import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { ConversationItemType, ConversationsProps } from '@ant-design/x'
import { Conversations } from '@ant-design/x'
import { theme } from 'antd'
import React from 'react'
interface SiderProps {
  onCollapse: () => void
  conversations: ConversationItemType[]
  activeKey: string
  onChange: (key: string) => void
  onNewConversation: () => void
}

const App: React.FC<SiderProps> = ({
  onCollapse,
  conversations,
  activeKey,
  onChange,
  onNewConversation,
}: SiderProps) => {
  const { token } = theme.useToken()

  const style = {
    width: '100%',
    background: '#f9f9f9',
    borderRadius: token.borderRadius,
  }

  const menuConfig: ConversationsProps['menu'] = {
    items: [
      {
        label: '重命名',
        key: 'Rename',
        icon: <EditOutlined />,
      },
      {
        label: '删除',
        key: 'deleteChat',
        icon: <DeleteOutlined />,
        danger: true,
      },
    ],
    onClick: itemInfo => {
      console.log(`Click ${itemInfo.key}`)
      itemInfo.domEvent.stopPropagation()
    },
  }

  const expandClick = () => {
    onCollapse()
  }
  return (
    <>
      <div className="w-full h-10 flex items-center justify-between bg-white px-4">
        <div className="flex items-center justify-start">
          <i
            className="iconfont icon-a-12345 text-[#0C5997] mr-2"
            style={{ fontSize: '24px' }}
          ></i>
          <span className="font-bold">AI</span>
        </div>
        <div>
          <i className="iconfont icon-shouqi" onClick={expandClick}></i>
        </div>
      </div>
      {/* 新对话 */}
      <div className="w-full flex items-center justify-between px-4 bg-white pt-4">
        <div
          className="w-full h-10 flex items-center justify-center border border-[#c6d5f9] bg-[#dfebff] hover:bg-[#cbd7f4] rounded-lg cursor-pointer"
          onClick={onNewConversation}
        >
          <i className="iconfont icon-jia text-[#1677ff] mr-1 font-bold"></i>
          <span className="font-bold text-[#1677ff] text-[16px]">新对话</span>
        </div>
      </div>
      <div className="w-full h-[calc(100vh-100px)] overflow-y-auto">
        <Conversations
          menu={menuConfig}
          items={conversations}
          style={style}
          groupable
          activeKey={activeKey || ''}
          onActiveChange={(key: string | null | undefined) => onChange(key || '')}
        />
      </div>
    </>
  )
}

export default App
