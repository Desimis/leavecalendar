import { TestBed } from '@angular/core/testing';

import { SubmissionStateService } from './submission-state.service';

describe('SubmissionStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmissionStateService = TestBed.get(SubmissionStateService);
    expect(service).toBeTruthy();
  });
});
