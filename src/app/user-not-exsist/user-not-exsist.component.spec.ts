import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotExsistComponent } from './user-not-exsist.component';

describe('UserNotExsistComponent', () => {
  let component: UserNotExsistComponent;
  let fixture: ComponentFixture<UserNotExsistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserNotExsistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserNotExsistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
