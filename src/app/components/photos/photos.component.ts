import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  id = 0;
  photos: any;
  constructor(myRoute: ActivatedRoute, private myService: UserDataService) {
    this.id = myRoute.snapshot.params["id"];
  }
  ngOnInit(): void {
    this.myService.GetPhotosByID(this.id).subscribe({
      next: (data) => { this.photos = data },
      error: (err) => { console.log(err); },
      complete: () => { console.log("Completed") }
    })
  }
}
