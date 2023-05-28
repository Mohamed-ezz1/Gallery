import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id = 0;
  user: any;
  albums: any;
  constructor(myRoute: ActivatedRoute, private myService: UserDataService) {
    this.id = myRoute.snapshot.params["id"]
  }
  ngOnInit(): void {
    this.myService.GetUserById(this.id).subscribe({
      next: (data) => { this.user = data; },
      error: (err) => { console.log(err); },
      complete: () => {
        console.log("complete");
      }
    })
    this.myService.GetAlbumsById(this.id).subscribe({
      next: (data) => { this.albums = data; },
      error: (err) => { console.log("error"); },
      complete: () => { console.log("complete"); }
    })
  }
}
