import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { ConversationsProps } from '@ant-design/x'
import { Conversations } from '@ant-design/x'
import type { GetProp } from 'antd'
import { theme } from 'antd'
import React from 'react'

const items: GetProp<ConversationsProps, 'items'> = [
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

interface SiderProps {
  onCollapse: () => void
}

const App: React.FC<SiderProps> = ({ onCollapse }) => {
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
        <div className="w-full h-10 flex items-center justify-center border border-[#c6d5f9] bg-[#dfebff] hover:bg-[#cbd7f4] rounded-lg cursor-pointer">
          <i className="iconfont icon-jia text-[#1677ff] mr-1 font-bold"></i>
          <span className="font-bold text-[#1677ff] text-[16px]">新对话</span>
        </div>
      </div>
      <div className="w-full h-[calc(100vh-100px)] overflow-y-auto">
        <Conversations
          defaultActiveKey="item1"
          menu={menuConfig}
          items={items}
          style={style}
          groupable
        />
      </div>
    </>
  )
}

export default App
