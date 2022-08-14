import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { Link, LinkSizes } from 'components/atoms/Link'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'

const RoomDeleted = () => (
    <HomePageContainer>
        <HomeContentContainer>
            <ScreenMessage text="Room Successfully Deleted!" />
            <Link
                href="/create-room"
                text="Create a New Room?"
                size={LinkSizes.lg}
            />
        </HomeContentContainer>
    </HomePageContainer>
)

export default RoomDeleted
