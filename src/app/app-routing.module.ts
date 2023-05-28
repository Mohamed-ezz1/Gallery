import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PhotosComponent } from './components/photos/photos.component';


const routes: Routes = [{ path: '', component: UsersPageComponent },
{ path: "users/:id", component: UserDetailsComponent },
{ path: "albums/:id", component: PhotosComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
