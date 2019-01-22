import { TestBed, async, inject } from '@angular/core/testing';

import { InitModulesGuard } from '../../guards/init-modules.guard';

describe('InitModulesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitModulesGuard]
    });
  });

  it('should ...', inject([InitModulesGuard], (guard: InitModulesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
