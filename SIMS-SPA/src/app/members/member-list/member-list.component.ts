import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  roleList = [{value: 'Student', display: 'Students'}, {value: 'Faculty', display: 'Faculty'}];
  searchByOptions = [{value: 'username', display: 'Dawg Tag'}, {value: 'firstName', display: 'First Name'},
  {value: 'lastName', display: 'Last Name'}, {value: 'currentProgram', display: 'Current Program'}];
  orderByOptions = [{value: 'Last Name: A-Z', display: 'Last Name: A-Z'}, {value: 'Last Name: Z-A', display: 'Last Name: Z-A'},
                    {value: 'First Name: A-Z', display: 'First Name: A-Z'}, {value: 'First Name: Z-A', display: 'First Name: Z-A'}];
  userParams: any = {};
  pagination: Pagination;
  filterByGender = false;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl    = environment.apiUrl;
  userData = {'fileName': ''};

  constructor(private userService: UserService, private alertify: AlertifyService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.users = data['users'].result;
      console.log('ngonit', this.users);
      this.pagination = data['users'].pagination;
    });

    this.userParams.role = 'Student';
    this.userParams.searchBy = '';
    this.userParams.searchByInput = '';
    this.userParams.orderBy = '';
    this.initializeUploader();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  /*resetFilters() {
    // this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    // this.userParams.gender = 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }*/
  handleInput(event: KeyboardEvent) {
    if (this.userParams.searchBy !== '') {
      this.loadUsers();
    }
  }
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
      console.log('loaduser:', this.users);
    }, error => {
      this.alertify.error(error);
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
        this.loadUsers();
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


}
