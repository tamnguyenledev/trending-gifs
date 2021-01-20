import * as React from 'react'
import { useInfiniteQuery } from 'react-query'
import styled from 'styled-components'
import { Gif } from './Gif'
import axios from 'axios'
import { ImageModal } from './ImageModal'

const Container = styled.div`
  width: 90%;
  margin: auto;
  padding: 32px 0;

  @media screen and (min-width: 1025px) {
    width: 80%;
  }
`

const LoadMoreButton = styled.button`
  background: ${({ theme }) => theme.colors.blue};
  border-radius: 4px;
  border: none !important;
  padding: 12px 24px;
  color: white;
  cursor: pointer;
  width: fit-content;
  &:disabled {
    background: ${({ theme }) => theme.colors.greyMedium};
    color: ${({ theme }) => theme.colors.grey};
    cursor: not-allowed;
  }
`

const GifList = styled.div`
  display: grid;
  grid-gap: 8px;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 12px;
  }

  @media screen and (min-width: 1025px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 16px;
  }
`

const API_KEY = '5rjE5kxhOnecxxRxkmqbYkcF8mpdHm54'
const PAGE_SIZE = 20

export const TrendingGifs: React.FC = () => {
  const { status, error, data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    'trendingGifs',
    async ({ pageParam = 0 }) => {
      try {
        const res = await axios.get(
          `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${PAGE_SIZE}&offset=${pageParam}`
        )
        const { data, pagination } = res.data
        const hasNextPage = pagination.offset + PAGE_SIZE <= pagination.total_count

        return { data, nextOffset: hasNextPage ? pagination.offset + PAGE_SIZE : false }
      } catch (error) {
        throw error.message
      }
    },
    {
      getNextPageParam: (firstPage) => firstPage.nextOffset,
    }
  )
  const [selectedGif, setSelectedGif] = React.useState<{ src: string; title: string }>({
    src: '',
    title: '',
  })

  return (
    <Container>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <p>{`An error has occurred: ${error}`}</p>
      ) : (
        <>
          <GifList>
            {data?.pages?.map((page) => (
              <React.Fragment key={page.nextOffset}>
                {page?.data.map(({ id, title, user, images: { fixed_height: { url } } }) => (
                  <Gif key={id} title={title} url={url} user={user} onClick={setSelectedGif} />
                ))}
              </React.Fragment>
            ))}
          </GifList>
          <p>{isFetching && !isFetchingNextPage ? 'Refetching...' : null}</p>
          {data && (
            <LoadMoreButton disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
            </LoadMoreButton>
          )}
        </>
      )}
      <ImageModal
        src={selectedGif.src}
        title={selectedGif.title}
        onClose={() => setSelectedGif({ src: '', title: '' })}
      />
    </Container>
  )
}
