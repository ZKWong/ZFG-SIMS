import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';

import { SemesterlistComponent } from '../semesterlist/semesterlist.component';

import { ISemester } from '../model/semester';
import { SemesterService } from '../services/semester.service';
import { DBOperation } from '../shared/DBOperation';
import { Global } from '../shared/Global';

@Component({
  selector: 'app-semesterform',
  templateUrl: './semesterform.component.html',
  styleUrls: ['./semesterform.component.css']
})


export class SemesterformComponent implements OnInit {

      indLoading = false;
      semesterFrm: FormGroup;
      // dbops: DBOperation;
      // modalTitle: string;
      // modalBtnTitle: string;
      listFilter: string;
      selectedOption: string;



  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _semesterService: SemesterService,
    public dialogRef: MatDialogRef<SemesterlistComponent>) { }

  ngOnInit() {
    // built semester form
    this.semesterFrm = this.fb.group({
      id: [''],
      semesterTime: ['', [Validators.required, Validators.maxLength(50)]],
      from: [''],
      to: ['']
    });

    // subscribe on value changed event of form to show validation message
    this.semesterFrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

    if (this.data.dbops === DBOperation.create) {
      this.semesterFrm.reset();
    } else {
      this.semesterFrm.setValue(this.data.contact);
    }
    this.SetControlsState(this.data.dbops === DBOperation.delete ? false : true);
  }


  // form value change event
  onValueChanged(data?: any) {
    if (!this.semesterFrm) { return; }
    const form = this.semesterFrm;
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      // setup custom validation message to form
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  // form errors model
  // tslint:disable-next-line:member-ordering
  formErrors = {
    'semestertime': '',
  };
  // custom valdiation messages
  // tslint:disable-next-line:member-ordering
  validationMessages = {
    'semestertime': {
      'maxlength': 'Semester cannot be more than 50 characters long.',
      'required': 'Semester is required.'
    },
  };


  onSubmit(formData: any) {
    const semesterData = this.mapDateData(formData.value);
    switch (this.data.dbops) {
      case DBOperation.create:
        this._semesterService.addSemester(semesterData).subscribe(
          data => {
            // Success
            if (data.message) {
              this.dialogRef.close('success');
            } else {
              this.dialogRef.close('error');
            }
          },
          error => {
            this.dialogRef.close('error');
          }
        );
        break;
      case DBOperation.update:
        this._semesterService.updateSemester(semesterData.id, semesterData).subscribe(
          data => {
            // Success
            if (data.message) {
              this.dialogRef.close('success');
            } else {
              this.dialogRef.close('error');
            }
          },
          error => {
            this.dialogRef.close('error');
          }
        );
        break;
      case DBOperation.delete:
        this._semesterService.deleteSemester(semesterData.id).subscribe(
          data => {
            // Success
            if (data.message) {
              this.dialogRef.close('success');
            } else {
              this.dialogRef.close('error');
            }
          },
          error => {
            this.dialogRef.close('error');
          }
        );
        break;
    }
  }

  SetControlsState(isEnable: boolean) {
    isEnable ? this.semesterFrm.enable() : this.semesterFrm.disable();
  }

  // mapDateData(semester: ISemester): ISemester {
  //   semester.From = new Date(semester.From).toISOString();
  //   semester.To = new Date(semester.To).toISOString();
  //   return semester;
  // }

  mapDateData(formValue: any): ISemester {
    const semester: ISemester = {id : formValue.id, From : formValue.from, To : formValue.to, SemesterTime : formValue.semesterTime};
    return semester;
  }
}
