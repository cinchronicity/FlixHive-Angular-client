import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDirectorDialogComponent } from './movie-director-dialog.component';

describe('MovieDirectorDialogComponent', () => {
  let component: MovieDirectorDialogComponent;
  let fixture: ComponentFixture<MovieDirectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDirectorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDirectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
