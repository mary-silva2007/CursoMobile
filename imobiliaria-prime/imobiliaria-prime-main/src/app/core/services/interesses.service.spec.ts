import { TestBed } from '@angular/core/testing';

import { InteressesService } from './interesses.service';

describe('InteressesService', () => {
  let service: InteressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
