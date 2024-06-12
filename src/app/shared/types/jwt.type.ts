export type JwtPayload = {
  authorities: string;
  exp: number;
  iat: number;
  sub: string;
  username: string;
  name: string;
};

export type JwtAuthorities = {
  authority: string;
};
