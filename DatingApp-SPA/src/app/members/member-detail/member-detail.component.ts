import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;

  constructor(
    private userService: UserService,
    private alertify: AlertyfyService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    const tabParam = this.route.snapshot.queryParamMap.get('tab');
    if (tabParam) {
      this.selectTab(+tabParam);
    }
    this.user = this.route.snapshot.data['user'];
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
    // this.route.data.subscribe(data => {
    //   this.user = data['user'];
    // });
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

}
