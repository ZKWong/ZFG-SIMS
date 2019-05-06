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
  selector: 'app-importuserdata',
  templateUrl: './importuserdata.component.html',
  styleUrls: ['./importuserdata.component.css']
})
export class ImportuserdataComponent implements OnInit {

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl    = environment.apiUrl;
  userData = {'fileName': ''};
  columnDefs = [
    {headerName: '#', field: 'row', resizable: true, width: 50},
    {headerName: 'UserName', field: 'UserName', resizable: true, width: 120},
    {headerName: 'FirstName', field: 'FirstName', resizable: true, width: 120},
    {headerName: 'LastName', field: 'LastName', resizable: true, width: 120},
    {headerName: 'Email', field: 'Email', resizable: true, width: 130},
    {headerName: 'Cell Phone', field: 'PhoneNumber', resizable: true, width: 120},
    {headerName: 'DegreeProgram', field: 'DegreeProgram', resizable: true, width: 80},
    {headerName: 'CurrentProgram', field: 'CurrentProgram', resizable: true, width: 80},
    {headerName: 'Bsc Start Date', field: 'BachelorStartDate', resizable: true, width: 120},
    {headerName: 'Bsc Proj Title', field: 'BachelorProjectTitle', resizable: true, width: 120},
    {headerName: 'Bsc Grad Date', field: 'BachelorGradDate', resizable: true, width: 120},
    {headerName: 'Master Start Date', field: 'MasterStartDate', resizable: true, width: 120},
    {headerName: 'Master Thesis Topic', field: 'MasterThesisTitle', resizable: true, width: 120},
    {headerName: 'Master Defense Date', field: 'MasterDefenseDate', resizable: true, width: 120},
    {headerName: 'Master Grad Date', field: 'MasterGraduationDate', resizable: true, width: 120},
    {headerName: 'PhD Candidate Date', field: 'DateAcceptedForCandidacy', resizable: true, width: 120},
    {headerName: 'Dissertation Title', field: 'DissertationTitle', resizable: true, width: 120},
    {headerName: 'Dissertation Defense Date', field: 'DissertationDefenseDate', resizable: true, width: 120},
    {headerName: 'PhD Grad Date', field: 'DoctorateGradDate', resizable: true, width: 120},
  ];

  rowData = [];
  rawRow  = [];
  rowClicked = {};

  grid_params = {
    columnGroups: true,
    allColumns: true,
    fileName: 'sims_userdata.csv',
    columnSeparator: ','
  };
  gridApi;


  constructor(private authService: AuthService,
    private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
    this.GetUserData();
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
        this.GetUserData();
        this.userData.fileName = '';
      }
    };
  }

  importdata() {
    if (this.userData.fileName === '') {
      this.alertify.warning('Please select a valid csv file');
      return;
    }
    const fNames = this.userData.fileName.split('\\');
    const hLen = (fNames.length - 1);
    console.log(this.userData);

    this.uploader.setOptions( {url: this.baseUrl +
      'UsersData/importfile/' + fNames[hLen] });
    console.log(this.uploader.options.url);
    this.uploader.uploadAll();
  }

  ExportGridData2Csv() {
    this.gridApi.exportDataAsCsv(this.grid_params);
  }

  GetUserData() {
    this.http.get(this.baseUrl + 'UsersData/GetFullUserData').subscribe(
      (res: any) => {
        if (res === []) { return; }
        this.rowData = res;
      }, error => {
        this.alertify.error('GetUserData()' + error);
      }
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  onGridClicked(params) {
  }

}
