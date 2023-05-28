import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { UserDataService } from 'src/app/services/user-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
//private dialog: MatDialog to open the popup
export class UsersPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'edit', 'delete'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private userDataService: UserDataService, private formDataService: FormDataService) { }
  users: any;

  addEditUser() {
    const dialogRef = this.dialog.open(FormComponent);
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        const formData = this.formDataService.getFormData();
        if (formData) {
          // Add the new user to the table
          this.dataSource.data.push(formData);
          this.dataSource._updateChangeSubscription();
          // Show success message
          alert('User added successfully');
        }
      }
    });
  }

  ngOnInit(): void {
    this.getUsersData();
  }
  getUsersData() {
    this.userDataService.GetAllUsers().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Get all Users completed');
      }
    });
  }

  deleteUser(userId: number) {
    const userToDelete = this.dataSource.data.find(user => user.id === userId);

    if (userToDelete) {
      this.dataSource.data = this.dataSource.data.filter(user => user.id !== userId);

      // this.userDataService.deleteUser(userId).subscribe({
      //   next: () => {
      //     alert("User deleted");
      //   },
      //   error: (error) => {
      //     console.error('Error deleting student:', error);
      //   },
      //   complete: () => {
      //     console.log('Delete request completed');
      //   }
      // });
    }
  }


  //From angular material no edit
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(data: any) {
    const dialogRef = this.dialog.open(FormComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        const formData = this.formDataService.getFormData();
        if (formData) {
          // Add the new user to the table
          // this.dataSource.data.fill(formData);
          // data = formData;
          // this.dataSource._updateChangeSubscription();
          // Show success message
          console.log('User Updated successfully');
          console.log(formData)

        }
      }
    });
    // console.log(this.dataSource.data);
    console.log(data)
    // const userToEdit = this.dataSource.data.find(user => data.id === userId);

  }
}
