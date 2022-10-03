import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionsModalComponent } from './user-actions-modal.component';

describe('AddUserModalComponent', () => {
  let component: UserActionsModalComponent;
  let fixture: ComponentFixture<UserActionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActionsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
