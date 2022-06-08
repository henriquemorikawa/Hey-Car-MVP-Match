import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ReportsProvider } from '../contexts/ReportsContext'
import { GlobalStyle } from '../styles/global'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ReportsProvider>
        <Component {...pageProps} />
      </ReportsProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp
