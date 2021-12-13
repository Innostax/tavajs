import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserModal } from './AddUserModal';

describe('AddUserModal', () => {
  let component: AddUserModal;
  let fixture: ComponentFixture<AddUserModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
