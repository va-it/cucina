import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFormComponent } from './recipe-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('RecipeFormComponent', () => {
  let component: RecipeFormComponent;
  let fixture: ComponentFixture<RecipeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [RecipeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
