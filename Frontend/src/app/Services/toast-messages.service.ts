import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {

  constructor(private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Registration Completed Successfully');
  }

  showError() {
    this.toastr.error('Something went wrong', 'Error');
  }

  showInfo() {
    this.toastr.info('This is an info message', 'Info');
  }

  showWarning() {
    this.toastr.warning('This is a warning message', 'Warning');
  }
}
