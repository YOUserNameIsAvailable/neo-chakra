import React from 'react'
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react'
import 'react-color-picker/index.css'
import '@reach/combobox/styles.css'
import '../assets/main.css'
import { wrapper } from '~core/store'
import { ErrorBoundary as BugsnagErrorBoundary } from '~utils/bugsnag'
import AppErrorBoundary from '~components/errorBoundaries/AppErrorBoundary'
import { AppProps } from 'next/app'
import { theme } from '@chakra-ui/pro-theme'
import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/inter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const proTheme = extendTheme(theme)
const extenstion = {
  colors: { ...proTheme.colors, brand: proTheme.colors.teal },
  fonts: {
    heading: '"Spline Sans Variable", -apple-system, system-ui, sans-serif',
    body: '"Open Sans Variable", -apple-system, system-ui, sans-serif',
  },
}
const myTheme = extendTheme(extenstion, proTheme)

const Main = ({ Component, pageProps }: AppProps) => (
  <BugsnagErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={myTheme}>
        <AppErrorBoundary>
          <Component {...pageProps} />
        </AppErrorBoundary>
      </ChakraProvider>
    </QueryClientProvider>
  </BugsnagErrorBoundary>
)
export default wrapper.withRedux(Main)
