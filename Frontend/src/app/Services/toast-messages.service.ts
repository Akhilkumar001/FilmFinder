import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {

  constructor(private toastr: ToastrService) { }

  showSuccess(msg: any) {
    console.log(msg)
    this.toastr.success(msg);
  }

  showError(msg: any) {
    this.toastr.error(msg);
  }

  showInfo(msg: any) {
    this.toastr.info(msg);
  }

  showWarning(msg: any) {
    this.toastr.warning(msg);
  }
}
