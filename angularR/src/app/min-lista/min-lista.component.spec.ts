import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinListaComponent } from './min-lista.component';

describe('MinListaComponent', () => {
  let component: MinListaComponent;
  let fixture: ComponentFixture<MinListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
