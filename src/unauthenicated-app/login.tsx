import React from 'react'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenicated-app'
import { useDispatch } from 'react-redux'
import { login } from 'stores/auth.slice'
import { User } from 'screens/project-list/search-panel'

export const LoginScreen: React.FC = () => {
  const dispatch = useDispatch() as (...args: unknown[]) => Promise<User>

  const handleSubmit = (values: { username: string, password: string }) => {
    dispatch(login(values))
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
