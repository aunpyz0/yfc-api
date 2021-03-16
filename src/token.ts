import crypto from 'crypto'

const TOKEN_KEY = process.env.TOKEN_KEY as string
const bytesLenght = 32

export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'

export function hash(data: string): string {
    return crypto.createHmac('sha256', TOKEN_KEY).update(data).digest('base64')
}

export function token(): string {
    const bytes = crypto.randomBytes(bytesLenght)
    const token = bytes.toString('base64')
        .replace(/\//g, '_')
        .replace(/\+/g, '-')
    return token
}

