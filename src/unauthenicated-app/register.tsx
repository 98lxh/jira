import React from 'react'
import { Form, Input } from 'antd'
import { useAuth } from 'context/auth-context'
import { LongButton } from 'unauthenicated-app'
import { useAsync } from 'hooks/use-async'

export const RegisterScreen: React.FC<{ onError: (error: Error) => void }> = ({ onError }) => {
  const { register } = useAuth()

  const { run, isLoading } = useAsync()

  const handleSubmit = async (
    { username,
      password,
      certifyPassword
    }: {
      username: string,
      password: string,
      certifyPassword: string
    }) => {
    if (password !== certifyPassword) {
      onError(new Error('请确认两次输入密码一直'))
      return
    }

    try {
      await run(register({ username, password, certifyPassword }))
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
    <Form.Item name="certifyPassword" rules={[{ required: true, message: '请确认密码' }]}>
      <Input.Password placeholder="请确认密码" type="text" id='certifyPassword' />
    </Form.Item>
    <Form.Item>
      <LongButton htmlType="submit" type="primary" loading={isLoading}>注册</LongButton>
    </Form.Item>
  </Form >
}
