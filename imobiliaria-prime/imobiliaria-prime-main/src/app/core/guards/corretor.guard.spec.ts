import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { corretorGuard } from './corretor.guard';

describe('corretorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => corretorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
