import React from 'react'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenicated-app'
import { useAsync } from 'hooks/use-async'
import { useAuth } from 'context/auth-context'

export const LoginScreen: React.FC<{ onError: (error: Error) => void }> = ({ onError }) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  const handleSubmit = async ({ username, password }: { username: string, password: string }) => {
    try {
      await run(login({ username, password }))
    } catch (error: any) {
      onError(error)
    }
  }

  return <Form onFinish={handleSubmit}>
    <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
      <Input placeholder="用户名" type="text" id='username' />
    </Form.Item>
    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
      <Input.Password placeholder="密码" type="text" id='password' />
    </Form.Item>
    <Form.Item>
      <LongButton htmlType="submit" type="primary" loading={isLoading}>登录</LongButton>
    </Form.Item>
  </Form >
}
