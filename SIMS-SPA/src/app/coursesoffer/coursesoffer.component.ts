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
  selector: 'app-coursesoffer',
  templateUrl: './coursesoffer.component.html',
  styleUrls: ['./coursesoffer.component.css']
})
export class CoursesofferComponent implements OnInit {
  baseUrl = environment.apiUrl;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  importFile = {'fileName': ''};
  columnDefs = [
    {headerName: '#', field: 'row', resizable: true, width: 50},
    {headerName: 'Prof', field: 'prof_name', resizable: true},
    {headerName: 'Course', field: 'course', resizable: true, width: 80},
    {headerName: 'Name', field: 'course_name', resizable: true},
    {headerName: 'Year', field: 'course_year', resizable: true, width: 80},
    {headerName: 'Semester', field: 'course_semester', resizable: true},
  ];

  rowData = [];

  rowClicked = {'row': '',
                'Id': '',
                'prof_id': '',
                'prof_name': '',
                'course': '',
                'course_name': '',
                'course_year': '',
                'course_semester': ''};

  grid_params = {
    columnGroups: true,
    allColumns: true,
    fileName: 'courses_offer.csv',
    columnSeparator: ','
  };
  gridApi;

  reply_msg = {'msg': ''};

  property = { professor: undefined, year: undefined, semester: undefined };

  professors = [
                {'prof_id': '1', 'prof_name': 'katie'},
                {'prof_id': '2', 'prof_name': 'rosanna'},
                {'prof_id': '3', 'prof_name': 'lorene'}
               ];

  years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028' ];

  semesters = [ 'Fall', 'Winter', 'Spring', 'Summer' ];

  courses = [{'row': '', 'Id': '', 'course': '', 'course_name': '' }];

  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.GetProfessors();
    this.GetKoursesInfos();
    this.GetCoursesOfferInfos();
    this.initializeUploader();
  }

  GetProfessors() {
    console.log(this.baseUrl);
    this.http.get(this.baseUrl + 'CourseSchedules/GetProfessors').subscribe(
      (res: any) => {
        this.professors = res;
      }, error => {
        this.alertify.error('GetCoursesInfos() ' + error);
        console.log(error);
      }
    );
  }

  GetKoursesInfos() {
    console.log(this.baseUrl);
    this.http.get(this.baseUrl + 'CourseSchedules/GetCoursesInfos').subscribe(
      (res: any) => {
        this.courses = res;
      }, error => {
        this.alertify.error('GetCoursesInfos() ' + error);
        console.log(error);
      }
    );
  }

  GetCoursesOfferInfos() {
    console.log(this.baseUrl);
    this.http.get(this.baseUrl + 'CourseSchedules/GetKoursesOfferInfos').subscribe(
      (res: any) => {
        this.rowData = res;
      }, error => {
        // this.alertify.error('GetCoursesOfferInfos() ' + error);
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
    console.log(this.rowClicked);
    this.property.professor = this.professors.find(p => p.prof_id === this.rowClicked.prof_id);
  }

  Courses_Offer_AddUpdateDelete(updateType) {
    let subUrl = '';
    if ( this.rowClicked.course === '' ) {
      this.alertify.error('Please enter a course value');
      return;
    } else if ( (this.rowClicked.Id === '') && (updateType !== 'ADD') ) {
      this.alertify.error('Course Id not found');
      return;
    } else if ( this.rowClicked.prof_id === '' ) {
      this.alertify.error('Please select a Professor name');
      return;
    } else if ( this.rowClicked.course_year === '' ) {
      this.alertify.error('Please select a valid year value');
      return;
    } else if ( this.rowClicked.course_semester === '' ) {
      this.alertify.error('Please select a valid semester value');
      return;
    }
    if (updateType === 'ADD') {
      subUrl = 'Courses_Offer_Add';
    } else  if (updateType === 'DELETE') {
      subUrl = 'Courses_Offer_Delete';
    } else  {
      subUrl = 'Courses_Offer_Update';
    }
    this.http.post(this.baseUrl + 'CourseSchedules/' + subUrl, this.rowClicked).subscribe(
      (res: any) => {
        this.reply_msg = res;
        this.alertify.message(this.reply_msg.msg);
        console.log(res);
        this.GetCoursesOfferInfos();
      }, error => {
        this.alertify.error('GetCoursesInfos() ' + error);
        console.log(error);
      }
    );
  }

  onSelectCourse(kourse) {
    for (const entry of this.courses) {
      if ( this.rowClicked.course === entry.course ) {
        this.rowClicked.course_name = entry.course_name;
        break;
      }
    }
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
        this.GetCoursesOfferInfos();
        this.importFile.fileName = '';
      }
    };
  }

  importcoursesoffer() {
    if (this.importFile.fileName === '') {
      this.alertify.warning('Please select a valid csv file');
      return;
    }
    const fNames = this.importFile.fileName.split('\\');
    const hLen = (fNames.length - 1);
    console.log(this.importFile);

    this.uploader.setOptions( {url: this.baseUrl +
      'CourseSchedules/importcoursesoffer/' + fNames[hLen] });
    console.log(this.uploader.options.url);
    this.uploader.uploadAll();
  }
}
