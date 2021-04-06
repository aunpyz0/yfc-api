import jwt from 'jsonwebtoken'

const TOKEN_KEY = process.env.TOKEN_KEY as string
const REFRESH_TOKEN_AGE = process.env.REFRESH_TOKEN_AGE
const ACCESS_TOKEN_AGE = process.env.ACCESS_TOKEN_AGE

export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'

interface Claim {
    id: number  
}
interface Payload {
    id: number
    type: string
}

export function generateAccessToken(payload: Claim): string {
    return jwt.sign({ 
        ...payload,
        type: ACCESS_TOKEN,
    }, TOKEN_KEY, {
        expiresIn: ACCESS_TOKEN_AGE,
    })
}

export function generateRefreshToken(payload: Claim): string {
    return jwt.sign({ 
        ...payload,
        type: REFRESH_TOKEN,
    }, TOKEN_KEY, {
        expiresIn: REFRESH_TOKEN_AGE,
    })
}

export function verifyToken(token: string): Payload {
    try {
        const payload = jwt.verify(token, TOKEN_KEY) as Payload
        return payload
    } catch (err) {
        throw err
    }
}