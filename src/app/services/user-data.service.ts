import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // private users: any[] = [];
  constructor(private readonly myClient: HttpClient) { }
  private readonly Base_url = "http://jsonplaceholder.typicode.com/";
  GetAllUsers(): Observable<any> {
    return this.myClient.get(this.Base_url + 'users').pipe(
      tap((data: any) => console.log(data))
    );
  }

  GetUserById(id: any) {
    return this.myClient.get(this.Base_url + "users/" + id);
  }

  GetAlbumsById(userId: number): Observable<any> {
    return this.myClient.get(this.Base_url + 'users/' + userId + '/albums');
  }

  GetPhotosByID(albumId: number): Observable<any> {
    return this.myClient.get(this.Base_url + 'photos?albumId=' + albumId)
      .pipe(
        tap((data: any) => console.log(data))
      );
  }

  // AddUser(user: any) {
  //   console.log('Adding user:', user);
  //   return this.myClient.post(this.Base_url + "users/", user);
  // }
  // deleteUser(id: number): Observable<any> {
  //   const url = `${this.Base_url}users/${id}`;
  //   if (confirm('Are you sure you want to delete this user')) {
  //     console.log('Deleting user:', url, id);
  //     return this.myClient.delete(url);
  //   }
  //   else {
  //     return throwError(() => new Error('User cancelled delete operation'));
  //   }
  // }

  // updateUser(user: any): Observable<any> {
  //   const url = `${this.Base_url}users/${user.id}`;
  //   return this.myClient.put<any>(url, user);
  // }
}
