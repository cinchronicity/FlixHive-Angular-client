import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSynopsisDialogComponent } from './movie-synopsis-dialog.component';

describe('MovieSynopsisDialogComponent', () => {
  let component: MovieSynopsisDialogComponent;
  let fixture: ComponentFixture<MovieSynopsisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieSynopsisDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSynopsisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
