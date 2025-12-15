import { useState } from 'react'
import Chat from './components/chat/Index.tsx'
import LeftSider from './components/sider.tsx'
const Model: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div
        className={`h-full bg-[#f9f9f9] pt-1 border-r border-[#e5e5e5] transition-all duration-300 overflow-hidden ${
          collapsed ? 'w-0 border-none' : 'w-[280px]'
        }`}
      >
        <LeftSider onCollapse={() => setCollapsed(true)} />
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
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default Model
