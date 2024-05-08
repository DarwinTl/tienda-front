export type JwtPayload = {
    authorities: string;
    exp: number;
    iat: number;
    sub: string;
    username: string;
}

export type JwtAuthorities = {
    authority: string;
}