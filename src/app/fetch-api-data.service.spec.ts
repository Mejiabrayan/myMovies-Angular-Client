import { TestBed } from '@angular/core/testing';

import { fetchApiDataService } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: fetchApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(fetchApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
