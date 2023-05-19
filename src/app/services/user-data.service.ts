import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // private users: any[] = [];
  constructor(private readonly myClient: HttpClient) { }
  private readonly Base_url = "http://jsonplaceholder.typicode.com/";
  GetAllUsers() {
    return this.myClient.get(this.Base_url + 'users');
  }
  GetAllAlbums() {
    return this.myClient.get(this.Base_url + 'albums');
  }
  GetAllPhotos() {
    return this.myClient.get(this.Base_url + 'photos');
  }
  GetUserById(id: any) {
    return this.myClient.get(this.Base_url + "users/" + id);
  }
  deleteUser(id: any): Observable<any> {
    const url = `${this.Base_url}users/${id}`;
    if (confirm('Are you sure you want to delete this student')) {
      console.log('Deleting user:', url, id);
      return this.myClient.delete<any>(url);
    }
    else {
      return throwError(() => new Error('User cancelled delete operation'));
    }
  }

  updateUser(user: any): Observable<any> {
    const url = `${this.Base_url}users/${user.id}`;
    return this.myClient.put<any>(url, user);
  }
}
