/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubexpensesService } from './subexpenses.service';

describe('Service: Subexpenses', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubexpensesService]
    });
  });

  it('should ...', inject([SubexpensesService], (service: SubexpensesService) => {
    expect(service).toBeTruthy();
  }));
});
