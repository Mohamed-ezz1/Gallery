import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  userForm!: FormGroup;
  //private dialogRef: DialogRef<FormComponent> (to close the popup form)
  constructor(private _formBuilder: FormBuilder,
    // private myService: UserDataService,
    private formService: FormDataService,
    //To retive the data into the form
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FormComponent>) {
    this.userForm = this._formBuilder.group({
      name: '',
      email: '',
      phone: '',
      city: '',
      street: '',
      suite: ''
    })
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        address: {
          city: this.userForm.value.city,
          street: this.userForm.value.street,
          suite: this.userForm.value.suite
        }
      };
      //To set the form data in case of Editing User
      this.formService.setFormData(formData);
      //To close the popup
      this.dialogRef.close(true);
    }
  }

}

// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormDataService } from 'src/app/services/form-data.service';

// @Component({
//   selector: 'app-form',
//   templateUrl: './form.component.html',
//   styleUrls: ['./form.component.css']
// })
// export class FormComponent {
//   email = new FormControl('', [Validators.required, Validators.email]);
//   userForm!: FormGroup;

//   constructor(
//     private _formBuilder: FormBuilder,
//     private dialogRef: MatDialogRef<FormComponent>,
//     private formService: FormDataService,
//     @Inject(MAT_DIALOG_DATA) private userData: any
//   ) {
//     this.userForm = this._formBuilder.group({
//       name: [userData?.name || '', Validators.required],
//       email: [userData?.email || '', [Validators.required, Validators.email]],
//       phone: [userData?.phone || '', Validators.required],
//       city: [userData?.address?.city || '', Validators.required],
//       street: [userData?.address?.street || '', Validators.required],
//       suite: [userData?.address?.suite || '', Validators.required]
//     });
//   }


//   onSubmit() {
//     if (this.userForm.valid) {
//       const formData = {
//         name: this.userForm.value.name,
//         email: this.userForm.value.email,
//         phone: this.userForm.value.phone,
//         address: {
//           city: this.userForm.value.city,
//           street: this.userForm.value.street,
//           suite: this.userForm.value.suite
//         }
//       };
//       this.formService.setFormData(formData);
//       this.dialogRef.close(true);
//     }
//   }
// }
