import styled from 'styled-components'
import classnames from 'classnames'
import { spin } from '../style/keyframes'

interface IconProps {
  type: string
  spin?: boolean
  spinDuration?: number
  fontSize?: string
}

export const Icon = styled.i.attrs<IconProps>(({ type, spin }) => ({
  className: classnames({ [`uil-${type}`]: type, spin }),
}))<IconProps>`
  text-align: center;
  line-height: 1em;
  height: fit-content;

  &&& {
    &::before {
      margin: 0;
    }

    -webkit-appearance: none;
  }

  &.spin::before {
    animation: ${spin} ${({ spinDuration }) => spinDuration}s infinite linear;
  }

  font-size: ${({ fontSize }) => fontSize};
`

Icon.defaultProps = {
  spinDuration: 1.5,
  fontSize: '16px',
}
