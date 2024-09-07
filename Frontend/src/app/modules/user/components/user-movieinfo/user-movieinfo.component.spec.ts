import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMovieinfoComponent } from './user-movieinfo.component';

describe('UserMovieinfoComponent', () => {
  let component: UserMovieinfoComponent;
  let fixture: ComponentFixture<UserMovieinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMovieinfoComponent]
    });
    fixture = TestBed.createComponent(UserMovieinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
