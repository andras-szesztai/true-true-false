const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export const generateRoomId = () => {
    let result = ''
    const charactersLength = CHARS.length
    for (let i = 0; i < 5; i += 1) {
        result += CHARS.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}
