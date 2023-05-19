import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  userForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.userForm = this._formBuilder.group({
      firstName: '',
      lastName: '',
      emails: '',
      phone: '',
      street: '',
      suit: '',
      city: ''
    })
  }
  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
}
