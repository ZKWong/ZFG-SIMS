import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { findLast } from '@angular/compiler/src/directive_resolver';
import { FileUploader } from 'ng2-file-upload';

AgGridModule.withComponents(null);

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  baseUrl = environment.apiUrl;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  importFile = {'fileName': ''};
  columnDefs = [
    {headerName: '#', field: 'row', resizable: true, width: 50},
    {headerName: 'Subj', field: 'subj', resizable: true, width: 70},
    {headerName: 'Number', field: 'course', resizable: true, width: 90},
    {headerName: 'Sect', field: 'sect', resizable: true, width: 70},
    {headerName: 'CRN', field: 'crn', resizable: true, width: 75},
    {headerName: 'Title', field: 'course_name', resizable: true},
    {headerName: 'Credit', field: 'credit', resizable: true},
    {headerName: 'Max Students', field: 'max_students', resizable: true},
    {headerName: 'Appr', field: 'appr', resizable: true},
    {headerName: 'Long Title', field: 'long_title', resizable: true},
  ];

  rowData = [];

  rowClicked = {'row': '',
                'Id': '',
                'course': '',
                'course_name': '',
                'appr': '',
                'credit': '',
                'crn': '',
                'long_title': '',
                'max_students': '',
                'sect': '',
                'subj': ''
               };

  grid_params = {
    columnGroups: true,
    allColumns: true,
    fileName: 'courses.csv',
    columnSeparator: ','
  };
  gridApi;

  reply_msg = {'msg': ''};


  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.initializeUploader();
    this.GetCoursesInfos();
  }

  GetCoursesInfos() {
    console.log(this.baseUrl);
    this.http.get(this.baseUrl + 'CourseSchedules/GetCoursesInfos').subscribe(
      (res: any) => {
        this.rowData = res;
      }, error => {
        this.alertify.error('GetCoursesInfos() ' + error);
        console.log(error);
      }
    );
  }

  Courses_AddUpdateDelete(updateType) {
    let subUrl = '';
    if ( this.rowClicked.course === '' ) {
      this.alertify.error('Please enter a course value');
      return;
    } else if ( this.rowClicked.course_name === '' ) {
      this.alertify.error('Please enter a course name value');
      return;
    }
    if (updateType === 'ADD') {
      subUrl = 'Courses_Add';
    } else  if (updateType === 'DELETE') {
      subUrl = 'Courses_Delete';
    } else  {
      subUrl = 'Courses_Update';
    }
    this.http.post(this.baseUrl + 'CourseSchedules/' + subUrl, this.rowClicked).subscribe(
      (res: any) => {
        this.reply_msg = res;
        this.alertify.message(this.reply_msg.msg);
        console.log(res);
        this.GetCoursesInfos();
      }, error => {
        this.alertify.error('GetCoursesInfos() ' + error);
        console.log(error);
      }
    );
  }

  ExportGridData2Csv() {
    this.gridApi.exportDataAsCsv(this.grid_params);
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  onGridClicked(params) {
    if (params.data === []) { return; }
    this.rowClicked = params.data;

    console.log(this.rowClicked.course, this.rowClicked.course_name);
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
        this.GetCoursesInfos();
        this.importFile.fileName = '';
      }
    };
  }

  importcourses() {
    if (this.importFile.fileName === '') {
      this.alertify.warning('Please select a valid csv file');
      return;
    }
    const fNames = this.importFile.fileName.split('\\');
    const hLen = (fNames.length - 1);
    console.log(this.importFile);

    this.uploader.setOptions( {url: this.baseUrl +
      'CourseSchedules/importcourses/' + fNames[hLen] });
    console.log(this.uploader.options.url);
    this.uploader.uploadAll();
  }
}
