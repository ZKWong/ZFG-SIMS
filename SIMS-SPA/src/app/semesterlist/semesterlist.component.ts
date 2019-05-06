import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SemesterformComponent } from '../semesterform/semesterform.component';

import { SemesterService } from '../services/semester.service';
import { ISemester } from '../model/semester';
import { DBOperation } from '../shared/DBOperation';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-semesterlist',
  templateUrl: './semesterlist.component.html',
  styleUrls: ['./semesterlist.component.css']
})

export class SemesterlistComponent implements OnInit {
  baseUrl = environment.apiUrl;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  importFile = {'fileName': ''};

  contacts: ISemester[];
  contact: ISemester;
  loadingState: boolean;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;

  // set columns that will need to show in listing table
  displayedColumns = ['semester', 'from', 'to', 'action'];
  // setting up datasource for material table
  dataSource = new MatTableDataSource<ISemester>();

  constructor(public snackBar: MatSnackBar,
              private _semesterService: SemesterService,
              private alertify: AlertifyService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.loadingState = false;
    this.initializeUploader();
    this.loadSemesters();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SemesterformComponent, {
      width: '500px',
      data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, contact: this.contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'success') {
        this.loadingState = true;
        this.loadSemesters();
        switch (this.dbops) {
          case DBOperation.create:
            this.showMessage('Data successfully added.');
            break;
          case DBOperation.update:
            this.showMessage('Data successfully updated.');
            break;
          case DBOperation.delete:
            this.showMessage('Data successfully deleted.');
            break;
        }
      } else if (result === 'error') {
        this.showMessage('There is some issue in saving records, please contact to system administrator!');
      } else {
       // this.showMessage('Please try again, something went wrong');
      }
    });
  }

  loadSemesters(): void {
    this._semesterService.getAllSemester()
      .subscribe((contacts: ISemester[]) => {
        this.loadingState = false;
        this.dataSource.data = contacts;
      });
  }

  addSemester() {
    this.dbops = DBOperation.create;
    this.modalTitle = 'Add New Semester';
    this.modalBtnTitle = 'Add';
    this.openDialog();
  }
  editSemester(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = 'Edit Semester';
    this.modalBtnTitle = 'Update';
    this.contact = this.dataSource.data.filter(x => x.id === id)[0];
    this.openDialog();
  }
  deleteSemester(id: number) {
    this.dbops = DBOperation.delete;
    this.modalTitle = 'Confirm to Delete ?';
    this.modalBtnTitle = 'Delete';
    this.contact = this.dataSource.data.filter(x => x.id === id)[0];
    this.openDialog();
  }
  showMessage(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 3000
    });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        console.log(response);
        this.alertify.message(response);
        this.loadSemesters();
        this.importFile.fileName = '';
      }
    };
  }

  importsemester() {
    if (this.importFile.fileName === '') {
      this.alertify.warning('Please select a valid csv file');
      return;
    }
    const fNames = this.importFile.fileName.split('\\');
    const hLen = (fNames.length - 1);
    console.log(this.importFile);

    this.uploader.setOptions( {url: this.baseUrl +
      'CourseSchedules/importsemester/' + fNames[hLen] });
    console.log(this.uploader.options.url);
    this.uploader.uploadAll();
  }
}
