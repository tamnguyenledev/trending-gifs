import * as React from 'react'
import styled from 'styled-components'
import { Icon } from './Icon'

const CardContainer = styled.div`
  padding: 8px;
  background: white;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.colors.greyMedium};

  @media screen and (min-width: 768px) {
    padding: 16px;
  }
`

const ImageContainer = styled.div<{ imageLoaded: boolean }>`
  display: flex;
  height: 200px;
  background: ${({ theme, imageLoaded }) => (imageLoaded ? 'white' : theme.colors.greyMedium)};
  img {
    max-width: 100%;
    margin: auto;
    cursor: pointer;
  }
  i.spinner {
    ${({ imageLoaded }) => (imageLoaded ? 'display: none' : '')};
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const SummarySection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.grey};
  font-size: 14px;

  i {
    cursor: pointer;
    line-height: 1.5;
  }

  .summary {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    i {
      margin: 0 2px 0 12px;
    }
  }
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;

  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    border-radius: 50%;
  }
  a {
    color: ${({ theme }) => theme.colors.blue};
    text-decoration: none;
  }
`

const IconLabel: React.FC<{ type: string; label: string }> = ({ type, label }) => (
  <div>
    <Icon type={type} />
    <span>{label}</span>
  </div>
)

interface CardProps {
  title: string
  url: string
  user: any
  onClick: (seletedGif: { src: string; title: string }) => void
}

export const Gif: React.FC<CardProps> = ({ title, url, user, onClick }) => {
  const { display_name, profile_url, avatar_url } = user || {}
  const [imageLoaded, setImageLoaded] = React.useState(false)

  return (
    <div>
      <CardContainer>
        <ImageContainer imageLoaded={imageLoaded}>
          <Icon className="spinner" type="spinner" spin fontSize="20px" />
          <img
            onLoad={() => {
              setImageLoaded(true)
            }}
            alt={title}
            src={url}
            onClick={() => onClick({ src: url, title })}
            style={imageLoaded ? {} : { display: 'none' }}
          />
        </ImageContainer>
        <SummarySection>
          <Icon type="paperclip" />
          <div className="summary">
            <IconLabel type="eye" label="123" key="eye" />
            <IconLabel type="comment" label="123" key="comment" />
            <IconLabel type="heart" label="123" key="heart" />
          </div>
        </SummarySection>
      </CardContainer>
      {user && (
        <UserSection>
          <img src={avatar_url} alt="user avatar" />
          <a href={profile_url} target="_blank" rel="noreferrer">
            {display_name}
          </a>
        </UserSection>
      )}
    </div>
  )
}
