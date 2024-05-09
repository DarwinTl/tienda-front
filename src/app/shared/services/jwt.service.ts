import { inject, Injectable } from '@angular/core';
import { AuthStore } from '@shared/store/auth.store';
import { JwtAuthorities, JwtPayload } from '@shared/types/jwt.type';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  authStore = inject(AuthStore);

  decodedToken() {
    const token = this.authStore.token();
    if (token === null) throw new Error('Token not found');
    return jwtDecode<JwtPayload>(token);
  }

  authorities() {
    return (
      JSON.parse(this.decodedToken().authorities) as JwtAuthorities[]
    ).map((auth) => auth.authority);
  }
}
