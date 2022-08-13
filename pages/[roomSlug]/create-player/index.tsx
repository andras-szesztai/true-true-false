import Head from 'next/head'

import { CreatePlayerPageContent } from 'components/templates/CreatePlayerPageContent'
import { APP_NAME } from 'constants/appName'

const CreateUserPlayerPage = () => (
    <>
        <Head>
            <title>{APP_NAME} - Create a Player</title>
        </Head>
        <CreatePlayerPageContent isAdmin={false} />
    </>
)

export default CreateUserPlayerPage
