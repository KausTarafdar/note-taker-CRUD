export function isBodyEmpty(message: string): boolean {
    const messageStripped = message.trim()
    if(messageStripped === ''){
        return true
    }
    return false
}