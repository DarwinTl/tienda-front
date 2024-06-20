export type JwtPayload = {
  authorities: string;
  exp: number;
  iat: number;
  sub: string;
  username: string;
  name: string;
  id: number;
};

export type JwtAuthorities = {
  authority: string;
};
