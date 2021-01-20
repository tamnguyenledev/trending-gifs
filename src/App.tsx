import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import styled from 'styled-components'
import { TrendingGifs, GlobalLoader } from './components'

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.greyLight};
  min-height: 100vh;
`

const queryClient = new QueryClient()

function App() {
  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <GlobalLoader />
        <TrendingGifs />
      </QueryClientProvider>
    </Container>
  )
}

export default App
