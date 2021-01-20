import * as React from 'react'
import { useIsFetching } from 'react-query'
import { Icon } from './Icon'
import styled from 'styled-components'

const FixedSpinner = styled(Icon)<{ isFetching: number }>`
  position: fixed;
  top: 12px;
  right: 12px;
  opacity: ${({ isFetching }) => (isFetching ? 1 : 0)};
  transition: 0.3s ease;
  font-size: 24px;
`

export const GlobalLoader = () => {
  const isFetching = useIsFetching()

  return <FixedSpinner type="spinner" spin isFetching={isFetching} />
}
