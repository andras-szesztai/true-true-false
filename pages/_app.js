import { Global } from '@emotion/react'

import { globalStyles } from 'styles/global'

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Global styles={globalStyles} />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
