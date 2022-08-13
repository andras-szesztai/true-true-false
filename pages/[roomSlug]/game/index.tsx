import Head from 'next/head'

import { CreateAPlayerCatch } from 'components/templates/CreateAPlayerCatch'
import { APP_NAME } from 'constants/appName'

export default () => (
    <>
        <Head>
            <title>{APP_NAME}</title>
        </Head>
        <CreateAPlayerCatch />
    </>
)
