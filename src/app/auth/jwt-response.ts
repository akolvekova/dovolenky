export interface JwtResponse {
    user: {
        id: number,
        login: string,
        heslo: string,
        access_token: string,
        expires_in: number
    }
}
