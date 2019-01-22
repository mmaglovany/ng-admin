import { TestBed, async, inject } from '@angular/core/testing';

import { ForAuthGuard } from '../../guards/for-auth.guard';

describe('ForAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForAuthGuard]
    });
  });

  it('should ...', inject([ForAuthGuard], (guard: ForAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
