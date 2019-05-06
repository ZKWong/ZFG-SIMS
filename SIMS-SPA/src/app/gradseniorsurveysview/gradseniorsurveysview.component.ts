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
  selector: 'app-gradseniorsurveysview',
  templateUrl: './gradseniorsurveysview.component.html',
  styleUrls: ['./gradseniorsurveysview.component.css']
})
export class GradseniorsurveysviewComponent implements OnInit {
  baseUrl = environment.apiUrl;
  eSurvey: any = {};

  columnDefs = [
    {headerName: 'Date', field: 'surveyDate', resizable: true},
    {headerName: 'Degree', field: 'degreeProgram', resizable: true},
    {headerName: 'Semester', field: 'termGraduateSemester', resizable: true},
    {headerName: 'Year', field: 'termGraduateYear', resizable: true},
    {headerName: 'Obj 1', field: 'obj1', resizable: true},
    {headerName: 'Obj 2', field: 'obj2', resizable: true},
    {headerName: 'Obj 3', field: 'obj3', resizable: true},
    {headerName: 'Obj 4', field: 'obj4', resizable: true},
    {headerName: 'Obj 5', field: 'obj5', resizable: true},
    {headerName: 'Outcome 1', field: 'outcome1', resizable: true},
    {headerName: 'Outcome 2', field: 'outcome2', resizable: true},
    {headerName: 'Outcome 3', field: 'outcome3', resizable: true},
    {headerName: 'Outcome 4', field: 'outcome4', resizable: true},
    {headerName: 'Outcome 5', field: 'outcome5', resizable: true},
    {headerName: 'Outcome 6', field: 'outcome6', resizable: true},
    {headerName: 'Outcome 7', field: 'outcome7', resizable: true},
    {headerName: 'Outcome 8', field: 'outcome8', resizable: true},
    {headerName: 'Outcome 9', field: 'outcome9', resizable: true},
    {headerName: 'Outcome 10', field: 'outcome10', resizable: true}
  ];

  rowData = [];

  grid_params = {
    columnGroups: true,
    allColumns: true,
    fileName: 'gradseniorsurveys.csv',
    columnSeparator: ','
  };
  gridApi;

  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.GetGradSeniorSurveys();
  }

  GetGradSeniorSurveys() {
    this.eSurvey = {};
    this.http.get(this.baseUrl + 'GradSeniorSurveys/GetGradSeniorSurveys').subscribe(
      (res: any) => {
        this.rowData = res;
      }, error => {
        this.alertify.error('GetGradSeniorSurveys() ' + error);
      }
    );
  }

  ExportGridData2Csv() {
    this.gridApi.exportDataAsCsv(this.grid_params);
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

}

