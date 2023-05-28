import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  formData: any = null;
  constructor() { }
  setFormData(data: any) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }
}
