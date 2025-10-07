import { CanActivateFn } from '@angular/router';

export const corretorGuard: CanActivateFn = (route, state) => {
  return true;
};
