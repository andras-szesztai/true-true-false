import { Global } from '@emotion/react'
import { AppProps } from 'next/app'

import { globalStyles } from 'styles/global'

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
    </>
)

export default MyApp
