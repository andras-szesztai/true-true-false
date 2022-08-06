import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'

import { Props } from './types'

// TODO
// 1. Add players board with score bars
// 2. Auto start wth first random player
// 3. Store how many questions are left in the room (managed by admin)
// 4. SelectedAnswer for each player stored when submit answer
// 5. Admin clicks reveal + add emojis on each statements
// 6. Reveal which one was false (admin reveals)
// 7. Everyone gets or loses points
// 8. Player gets flag as 'done'
// 9. Admin clicks "next" (if there is anyone not done yet) - Otherwise changes stage to END page

const GamePageContent = ({ room }: Props) => (
    <HomeContentContainer>
        <RoomSlugText slug={room.slug} size={RoomSlugSizes.md} />
        Game PAge
    </HomeContentContainer>
)

export default GamePageContent
