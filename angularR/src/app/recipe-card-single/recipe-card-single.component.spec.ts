import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardSingleComponent } from './recipe-card-single.component';

describe('RecipeCardSingleComponent', () => {
  let component: RecipeCardSingleComponent;
  let fixture: ComponentFixture<RecipeCardSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCardSingleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeCardSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
