import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofmoviesComponent } from './listofmovies.component';

describe('ListofmoviesComponent', () => {
  let component: ListofmoviesComponent;
  let fixture: ComponentFixture<ListofmoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListofmoviesComponent]
    });
    fixture = TestBed.createComponent(ListofmoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
