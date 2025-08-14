import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './core/services';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  //TODO make getToken method to authService
  // const authToken = authService.getToken();

  const authRequest = req.clone({
    setHeaders: {
      Authorization: authToken,
    }
  })

  return next(authRequest);
};
