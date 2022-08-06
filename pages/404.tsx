import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { ScreenMessage } from 'components/atoms/ScreenMessage'

const FourOhFour = () => (
    <HomePageContainer>
        <HomeContentContainer>
            <ScreenMessage text="404 - Page Not Found" />
            <Link href="/" text="Back home" size={LinkSizes.md} />
        </HomeContentContainer>
    </HomePageContainer>
)

export default FourOhFour
