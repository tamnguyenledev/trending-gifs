import * as React from 'react'
import styled from 'styled-components'
import { fadeIn } from '../style/keyframes'
import { Icon } from './Icon'

const Modal = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
`

const ImageContainer = styled.div`
  margin: auto;
  width: 80%;
  max-width: 700px;
  animation: 1s ${fadeIn};

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const ImageContent = styled.img`
  width: 100%;
  display: block;
`

const Caption = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.greyMedium};
  padding: 10px 0;
  height: 150px;
`

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 16px;
  right: 32px;
  color: white;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;

  &:hover,
  :focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }
`

interface ImageModalProps {
  src: string
  title: string
  onClose: () => void
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, title, onClose }) => {
  const modal = document.getElementById('imageModal')
  React.useEffect(() => {
    if (!modal) return
    if (src) {
      modal.style.display = 'block'
    } else {
      modal.style.display = 'none'
    }
  }, [src, modal])

  return (
    <Modal id="imageModal">
      <CloseIcon type="multiply" onClick={onClose} />
      <ImageContainer>
        <Icon type="spinner" spin fontSize="24px" />
        <ImageContent src={src} alt={title} />
        <Caption>{title}</Caption>
      </ImageContainer>
    </Modal>
  )
}
