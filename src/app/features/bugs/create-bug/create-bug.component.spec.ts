import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { BugsService } from '../services/bugs.service';

import { CreateBugComponent } from './create-bug.component';

describe('CreateBugComponent', () => {
  let component: CreateBugComponent;
  let fixture: ComponentFixture<CreateBugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBugComponent],
      imports: [SharedModule],
      providers: [BugsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form is invalid', () => {
    expect(component.createForm.valid).toBeFalsy();
  });

  it('form is valid with minimum required fields', () => {
    const titleControl = component.createForm.get('title');
    titleControl.setValue('Bug');
    //expect(titleControl.valid).toBeTruthy();

    const descriptionControl = component.createForm.get('description');
    descriptionControl.setValue('Dummy description');
    //expect(descriptionControl.valid).toBeTruthy();

    const priorityControl = component.createForm.get('priority');
    priorityControl.setValue('1');
    //expect(priorityControl.valid).toBeTruthy();

    const reporterControl = component.createForm.get('reporter');
    reporterControl.setValue('PO');
    //expect(reporterControl.valid).toBeTruthy();

    expect(component.createForm.valid).toBeTruthy();
  });

  it('form is valid with minimum required fields', () => {
    const titleControl = component.createForm.get('title');
    titleControl.setValue('Bug');
    //expect(titleControl.valid).toBeTruthy();

    const descriptionControl = component.createForm.get('description');
    descriptionControl.setValue('Dummy description');
    //expect(descriptionControl.valid).toBeTruthy();

    const priorityControl = component.createForm.get('priority');
    priorityControl.setValue('1');
    //expect(priorityControl.valid).toBeTruthy();

    const reporterControl = component.createForm.get('reporter');
    reporterControl.setValue('QA');
    //expect(reporterControl.valid).toBeTruthy();

    expect(component.createForm.valid).toBeFalsy();
  });

  it('form is valid with minimum required fields', () => {
    const titleControl = component.createForm.get('title');
    titleControl.setValue('Bug');
    //expect(titleControl.valid).toBeTruthy();

    const descriptionControl = component.createForm.get('description');
    descriptionControl.setValue('Dummy description');
    //expect(descriptionControl.valid).toBeTruthy();

    const priorityControl = component.createForm.get('priority');
    priorityControl.setValue('1');
    //expect(priorityControl.valid).toBeTruthy();

    const reporterControl = component.createForm.get('reporter');
    reporterControl.setValue('QA');
    //expect(reporterControl.valid).toBeTruthy();

    const statusControl = component.createForm.get('status');
    statusControl.setValue('Done');
    //expect(statusControl.valid).toBeTruthy();

    expect(component.createForm.valid).toBeTruthy();
  });
});
