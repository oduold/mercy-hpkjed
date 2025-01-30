import { TestBed } from '@angular/core/testing';

import { ExcelDataServiceService } from './excel-data-service.service';

describe('ExcelDataServiceService', () => {
  let service: ExcelDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
