import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersModule } from './Users';

describe('UsersModule', () => {
  let component: UsersModule;
  let fixture: ComponentFixture<UsersModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
