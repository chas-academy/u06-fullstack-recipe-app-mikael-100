import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';



export const authguardGuard: CanActivateFn = (route, state) => {
  console.log("den fungerar");
  return inject(AuthService).inloggad.getValue()
  
};
