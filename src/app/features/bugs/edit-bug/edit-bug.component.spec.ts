import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { BugsService } from '../services/bugs.service';

import { EditBugComponent } from './edit-bug.component';

describe('EditBugComponent', () => {
  let component: EditBugComponent;
  let fixture: ComponentFixture<EditBugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBugComponent],
      imports: [SharedModule],
      providers: [BugsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
