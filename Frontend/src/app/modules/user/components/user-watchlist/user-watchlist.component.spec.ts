import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWatchlistComponent } from './user-watchlist.component';

describe('UserWatchlistComponent', () => {
  let component: UserWatchlistComponent;
  let fixture: ComponentFixture<UserWatchlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserWatchlistComponent]
    });
    fixture = TestBed.createComponent(UserWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
