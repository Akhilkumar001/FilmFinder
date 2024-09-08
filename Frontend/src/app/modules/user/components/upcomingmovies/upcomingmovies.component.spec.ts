import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingmoviesComponent } from './upcomingmovies.component';

describe('UpcomingmoviesComponent', () => {
  let component: UpcomingmoviesComponent;
  let fixture: ComponentFixture<UpcomingmoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingmoviesComponent]
    });
    fixture = TestBed.createComponent(UpcomingmoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
