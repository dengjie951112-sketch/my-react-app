import {
  CloudUploadOutlined,
  OpenAIOutlined,
  PaperClipOutlined,
} from '@ant-design/icons'
import { Attachments, type AttachmentsProps, Sender } from '@ant-design/x'
import { Button, Divider, Flex, type GetProp, type GetRef } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

const Switch = Sender.Switch

const IconStyle = {
  fontSize: 16,
}

const SwitchTextStyle = {
  display: 'inline-flex',
  width: 28,
  justifyContent: 'center',
  alignItems: 'center',
}

interface SiderProps {
  welcome?: string
  conversationKey: string
  handleRequest: (params: any) => void
  abort: () => void
  isRequesting: boolean
  messages: any[]
}

const App: React.FC<SiderProps> = ({
  welcome = '你好，有什么可以帮您！',
  conversationKey,
  handleRequest,
  abort,
  isRequesting,
  messages,
}) => {
  const [deepThink, setDeepThink] = useState<boolean>(true)
  const [open, setOpen] = React.useState(false)
  const [items, setItems] = React.useState<GetProp<AttachmentsProps, 'items'>>(
    []
  )
  const senderRef = useRef<GetRef<typeof Sender>>(null)

  // Mock send message
  useEffect(() => {
    senderRef.current?.clear()
  }, [conversationKey])

  const senderHeader = (
    <Sender.Header
      title="Upload"
      open={open}
      onOpenChange={setOpen}
      styles={{
        content: {
          padding: 0,
        },
      }}
    >
      <Attachments
        // Mock not real upload file
        beforeUpload={() => false}
        items={items}
        onChange={({ file, fileList }) => {
          const updatedFileList = fileList.map(item => {
            if (
              item.uid === file.uid &&
              file.status !== 'removed' &&
              item.originFileObj
            ) {
              // clear URL
              if (item.url?.startsWith('blob:')) {
                URL.revokeObjectURL(item.url)
              }
              // create new preview URL
              return {
                ...item,
                url: URL.createObjectURL(item.originFileObj),
              }
            }
            return item
          })
          setItems(updatedFileList)
        }}
        placeholder={type =>
          type === 'drop'
            ? {
                title: '将文件拖拽到此处',
              }
            : {
                icon: <CloudUploadOutlined />,
                title: '上传文件',
                description: '点击或拖拽文件到此处上传',
              }
        }
        getDropContainer={() => senderRef.current?.nativeElement}
      />
    </Sender.Header>
  )

  return (
    <Flex vertical gap="middle" className="w-full">
      {messages && messages.length === 0 && (
        <div className="text-center font-bold text-3xl mb-2">{welcome}</div>
      )}
      <Sender
        loading={isRequesting}
        ref={senderRef}
        placeholder="请输入您的问题"
        header={senderHeader}
        footer={actionNode => {
          return (
            <Flex justify="space-between" align="center">
              <Flex gap="small" align="center">
                <Button
                  style={IconStyle}
                  type="text"
                  icon={<PaperClipOutlined />}
                  onClick={() => {
                    setOpen(!open)
                  }}
                />
                <Switch
                  value={deepThink}
                  checkedChildren={
                    <div>
                      深度思考:<span style={SwitchTextStyle}>on</span>
                    </div>
                  }
                  unCheckedChildren={
                    <div>
                      深度思考:<span style={SwitchTextStyle}>off</span>
                    </div>
                  }
                  onChange={(checked: boolean) => {
                    setDeepThink(checked)
                  }}
                  icon={<OpenAIOutlined />}
                />
              </Flex>
              <Flex align="center">
                {/* <Button type="text" style={IconStyle} icon={<ApiOutlined />} /> */}
                <Divider orientation="vertical" />
                {actionNode}
              </Flex>
            </Flex>
          )
        }}
        allowSpeech
        suffix={false}
        onSubmit={val =>
          handleRequest({
            messages: [{ role: 'user', content: val }],
          })
        }
        onCancel={abort}
        autoSize={{ minRows: 3, maxRows: 6 }}
      />
      {conversationKey && (
        <div className="text-center text-[12px] text-[#5d5d5d]">
          AI也可能会犯错。请核查重要信息。
        </div>
      )}
    </Flex>
  )
}

export default App
