import { TestBed } from '@angular/core/testing';

import { NotificationserviceService } from './notificationservice.service';

describe('NotificationserviceService', () => {
  let service: NotificationserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
