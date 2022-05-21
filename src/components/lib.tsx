import styled from "@emotion/styled";
import React from "react";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
  gap?: number | boolean
  between?: boolean
  marginBottom?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.between ? 'space-between' : undefined};
  margin-bottom: ${props => props.marginBottom + 'rem'};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : '0'} !important;
  }
`

const FullPage = styled.div`
  height: 100vh;
  width:100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`


export const FullPageLoading = () => (
  <FullPage>
    <Spin></Spin>
  </FullPage>
)

export const FullPageErrorFullback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <Typography.Text type="danger">{error?.message}</Typography.Text>
  </FullPage>
)
