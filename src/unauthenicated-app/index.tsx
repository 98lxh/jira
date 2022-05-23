import { useState } from "react"
import { Button, Card, Divider } from "antd"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"
import logo from "assets/logo.svg"
import left from "assets/left.svg"
import right from "assets/right.svg"

import styled from "@emotion/styled"
import { ErrorBox } from "components/lib"


export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        <ErrorBox error={error} />
        {
          isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />
        }
        <Divider />
        <Button type="link" onClick={() => setIsRegister(!isRegister)}>{isRegister ? '已经有帐号了？直接登录' : '没有账号?注册新账号'}</Button>
      </ShadowCard>
    </Container>
  )
}

export const LongButton = styled(Button)`
  width:100%;
`

const Title = styled.h2`
 margin-bottom:2.4rem;
 color:rgb(94,108,132);
`;

const Background = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-position:left bottom,right bottom;
  background-size:calc(((100vw - 40rem) / 2) - 3.2rem),calc(((100vw - 40rem) / 2) - 3.2rem),cover;
  background-image:url(${left}),url(${right})
`;

const Header = styled.header`
  background:url(${logo}) no-repeat center;
  padding:5rem 0;
  background-size:20rem;
  width:100%;
`

const ShadowCard = styled(Card)`
  width:40rem;
  min-height:56rem;
  padding:3.2rem 4rem;
  border-radius:0.3rem;
  box-shadow:rgba(0,0,0,0.1) 0 0 10px;
  text-align:center;
`;

const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  min-width: 100vh;
`;
