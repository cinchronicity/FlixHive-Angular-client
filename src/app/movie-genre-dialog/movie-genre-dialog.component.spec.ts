import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGenreDialogComponent } from './movie-genre-dialog.component';

describe('MovieGenreDialogComponent', () => {
  let component: MovieGenreDialogComponent;
  let fixture: ComponentFixture<MovieGenreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieGenreDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieGenreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
