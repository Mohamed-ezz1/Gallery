import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent {
  constructor(private dialog: MatDialog, private userDataService: UserDataService) { }
  users: any;
  addEditUser() {
    this.dialog.open(FormComponent)
  }

  ngOnInit() {
    this.userDataService.GetAllUsers().subscribe(
      {
        next: (data) => { this.users = data },
        error: (error) => { console.log(error) },
        complete: () => { console.log('Complete'); }
      }
    )
  }
  deleteStudent(userId: any) {
    this.userDataService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((user: any) => user.id !== userId);
        console.log("Student deleted successfully" + userId);
      },
      error: (error) => {
        console.error('Error deleting student:', error);
      },
      complete: () => {
        console.log('Delete request completed');
      }
    });
  }
}
