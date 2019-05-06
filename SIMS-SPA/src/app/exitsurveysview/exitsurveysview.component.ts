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

AgGridModule.withComponents(null);

@Component({
  selector: 'app-exitsurveysview',
  templateUrl: './exitsurveysview.component.html',
  styleUrls: ['./exitsurveysview.component.css']
})
export class ExitsurveysviewComponent implements OnInit {
  baseUrl = environment.apiUrl;
  eSurvey: any = {};
  record_id_exist = false;
  rowClicked = {'id': '', 'studentName': '', 'ssId': ''};
  columnDefs = [
    {headerName: 'Date', field: 'surveyDate', resizable: true},
    {headerName: 'Name', field: 'studentName', resizable: true},
    {headerName: 'StudentId', field: 'ssId', resizable: true},
    {headerName: 'Degree', field: 'degreeProgram', resizable: true},
    {headerName: 'Semester', field: 'termGraDuateSemester', resizable: true},
    {headerName: 'Year', field: 'termGraDuateYear', resizable: true},
    {headerName: 'ContactName', field: 'contact1Name', resizable: true},
    {headerName: 'ContactPhoneHome', field: 'contact1PhoneHome', resizable: true},
    {headerName: 'ContactPhoneWork', field: 'contact1PhoneWork', resizable: true},
    {headerName: 'ContactPhoneCell', field: 'contact1PhoneCell', resizable: true},
    {headerName: 'ContactAddress', field: 'contact1Address', resizable: true},
    {headerName: 'ContactEmail', field: 'contact1Email', resizable: true},
    {headerName: 'ContactOtherOption', field: 'contactOtherOption', resizable: true},
    {headerName: 'ContactOthName', field: 'contact2Name', resizable: true},
    {headerName: 'ContactOthPhoneHome', field: 'contact2PhoneHome', resizable: true},
    {headerName: 'ContactOthPhoneWork', field: 'contact2PhoneWork', resizable: true},
    {headerName: 'ContactOthPhoneCell', field: 'contact2PhoneCell', resizable: true},
    {headerName: 'ContactOthAddress', field: 'contact2Address', resizable: true},
    {headerName: 'ContactOthEmail', field: 'contact2Email', resizable: true},
    {headerName: 'Assess Q1', field: 'assessQ1', resizable: true},
    {headerName: 'Assess Q2', field: 'assessQ2', resizable: true},
    {headerName: 'Assess Q3', field: 'assessQ3', resizable: true},
    {headerName: 'Assess Comment', field: 'assessComment', resizable: true},
    {headerName: 'Graduate School', field: 'furtherStudySchool', resizable: true},
    {headerName: 'Graduate Major', field: 'furtherStudyMajor', resizable: true},
    {headerName: 'Graduate Scholarship', field: 'furtherStudyScholarship', resizable: true},
    {headerName: 'Job Search Duration', field: 'jobSearchDuration', resizable: true},
    {headerName: 'Job Search Interview', field: 'jobSearchNumInterview', resizable: true},
    {headerName: 'Job Search Offer', field: 'jobSearchNumOffer', resizable: true},
    {headerName: 'Job Search Avg Salary', field: 'jobSearchAvgSalary', resizable: true},
    {headerName: 'Job Company', field: 'jobCompany', resizable: true},
    {headerName: 'Job City', field: 'jobCity', resizable: true},
    {headerName: 'Job Title', field: 'jobTitle', resizable: true},
    {headerName: 'Job Company Contact', field: 'jobCompanyContact', resizable: true},
    {headerName: 'Job Company Web', field: 'jobCompanyWeb', resizable: true},
    {headerName: 'Job Salary', field: 'jobSalary', resizable: true},
    {headerName: 'Networking Q1', field: 'networkingQ1', resizable: true},
    {headerName: 'Networking Q2', field: 'networkingQ2', resizable: true}
  ];

  rowData = [];


  grid_params = {
    columnGroups: true,
    allColumns: true,
    fileName: 'exitsurveys.csv',
    columnSeparator: ','
  };
  gridApi;

  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.GetExitSurveys();
  }

  GetExitSurveys() {
    this.eSurvey = {};
    this.http.get(this.baseUrl + 'ExitSurveys/GetExitSurveys').subscribe(
      (res: any) => {
        this.rowData = res;
      }, error => {
        this.alertify.error('GetExitSurveys() ' + error);
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
    this.record_id_exist = true;
    console.log(this.rowClicked);
  }

  DeleteExitSurvey() {
    if (!confirm('delete this record?')) { return; }
    this.http.get(this.baseUrl + 'ExitSurveys/DeleteExitSurvey/' + this.rowClicked.id).subscribe(
      (res: any) => {
        console.log(res);
        this.record_id_exist = false;
        this.rowClicked = { 'id': '', 'studentName': '', 'ssId': '' };
        this.GetExitSurveys();
      }, error => {
        this.alertify.error('DeleteExitSurveys() ' + error);
      }
    );
  }
}


