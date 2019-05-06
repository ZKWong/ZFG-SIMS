import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  baseUrl    = environment.apiUrl;
  rowData = [];
  bsDate = '';
  bgDate = '';
  bDegreeBsc = true;
  bDegreeMaster = false;
  bDegreePhd    = false;

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.GetUserData();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];

    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return imageUrls;
  }
  GetUserData() {
    console.log('user-id:' + this.user.id);
    this.http.get(this.baseUrl + 'UsersData/GetUserData/' + this.user.id).subscribe(
      (res: any) => {
        console.log(res);
        if (res === []) { return; }
        this.rowData = res;
        this.bsDate = this.rowData['BachelorsStartDate'];
        this.bsDate = this.bsDate.substring(0, 10);
        this.rowData['BachelorsStartDate'] =  this.bsDate;
        this.bgDate = this.rowData['BachelorsGradDate'];
        this.bgDate = this.bgDate.substring(0, 10);
        this.rowData['BachelorsGradDate'] =  this.bgDate;
        if (this.rowData['DegreeProgram'] === 'M') {
          this.bDegreeMaster = true;
        } else if (this.rowData['DegreeProgram'] === 'P') {
          this.bDegreePhd = true;
          this.bDegreeMaster = true;
        }
      }, error => {
        this.alertify.error('GetUserData()' + error);
      }
    );
  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.aleritfy.error(error);
  //   });
  // }

}
