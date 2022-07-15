const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export const generateRoomId = (length: number) => {
    let result = ' '
    const charactersLength = CHARS.length
    for (let i = 0; i < length; i += 1) {
        result += CHARS.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}
