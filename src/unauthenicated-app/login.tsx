import React from 'react'
import { Form, Input } from 'antd'
import { useAuth } from 'context/auth-context'
import { LongButton } from 'unauthenicated-app'

export const LoginScreen: React.FC = () => {
  const { login } = useAuth()

  const handleSubmit = (values: { username: string, password: string }) => {
    login(values)
  }

  return <Form onFinish={handleSubmit}>
    <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
      <Input placeholder="用户名" type="text" id='username' />
    </Form.Item>
    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
      <Input placeholder="密码" type="text" id='password' />
    </Form.Item>
    <Form.Item>
      <LongButton htmlType="submit" type="primary">登录</LongButton>
    </Form.Item>
  </Form >
}
