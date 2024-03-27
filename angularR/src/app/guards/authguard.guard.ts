import { CanActivateFn } from '@angular/router';


export const authguardGuard: CanActivateFn = (route, state) => {
  console.log("den fungerar")
  return true;
};
