/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GradseniorsurveysviewComponent } from './gradseniorsurveysview.component';

describe('GradseniorsurveysviewComponent', () => {
  let component: GradseniorsurveysviewComponent;
  let fixture: ComponentFixture<GradseniorsurveysviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradseniorsurveysviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradseniorsurveysviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
