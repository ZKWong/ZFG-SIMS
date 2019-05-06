import { Component, OnInit, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AlertifyService } from '../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { UploadingFileError } from 'survey-angular';
import { AgGridModule } from 'ag-grid-angular';

AgGridModule.withComponents(null);

@Component({
  selector: 'app-importfacultydata',
  templateUrl: './importfacultydata.component.html',
  styleUrls: ['./importfacultydata.component.css']
})
export class ImportfacultydataComponent implements OnInit {

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl    = environment.apiUrl;
  facultyData = {'fileName': ''};
  columnDefs = [
    {headerName: '#', field: 'row', resizable: true, width: 50},
    {headerName: 'UserName', field: 'username', resizable: true, width: 120},
    {headerName: 'FirstName', field: 'first_name', resizable: true, width: 120},
    {headerName: 'LastName', field: 'last_name', resizable: true, width: 120},
    {headerName: 'Title', field: 'title', resizable: true, width: 80},
    {headerName: 'Office', field: 'office', resizable: true, width: 80},
    {headerName: 'Phone', field: 'phone', resizable: true, width: 120},
    {headerName: 'Research_Interest', field: 'research_interest', resizable: true, width: 120},
    {headerName: 'Designation', field: 'designation', resizable: true, width: 120},
    {headerName: 'Current', field: 'current', resizable: true, width: 120},
    {headerName: 'Email', field: 'email', resizable: true, width: 130},
    {headerName: 'Homepage', field: 'homepage', resizable: true, width: 120},
  ];

  rowData = [];
  rawRow  = [];
  rowClicked = {};

  grid_params = {
    columnGroups: true,
    allColumns: true,
    fileName: 'sims_facultydata.csv',
    columnSeparator: ','
  };
  gridApi;

  constructor(private authService: AuthService,
    private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
    this.GetFacultyData();
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
        this.GetFacultyData();
        this.facultyData.fileName = '';
      }
    };
  }

  importfacultydata() {
    if (this.facultyData.fileName === '') {
      this.alertify.warning('Please select a valid csv file');
      return;
    }
    const fNames = this.facultyData.fileName.split('\\');
    const hLen = (fNames.length - 1);
    console.log(this.facultyData);

    this.uploader.setOptions( {url: this.baseUrl +
      'UsersData/importfacultyfile/' + fNames[hLen] });
    console.log(this.uploader.options.url);
    this.uploader.uploadAll();
  }

  ExportGridData2Csv() {
    this.gridApi.exportDataAsCsv(this.grid_params);
  }

  GetFacultyData() {
    this.http.get(this.baseUrl + 'UsersData/GetFacultyData').subscribe(
      (res: any) => {
        if (res === []) { return; }
        this.rowData = res;
      }, error => {
        this.alertify.error('GetFacultyData()' + error);
      }
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  onGridClicked(params) {
    if (params.data === []) { return; }
    this.rowClicked = params.data;

  }
}
