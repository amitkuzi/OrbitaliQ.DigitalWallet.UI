/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalConfigurationService } from './LocalConfiguration.service';

describe('Service: LocalConfiguration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalConfigurationService]
    });
  });

  it('should ...', inject([LocalConfigurationService], (service: LocalConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
