import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contact = {
    name: '',
    email: '',
    phone: '',
    issue: ''


};
onSubmit(form: any) {
  if (form.valid) {
    console.log('Form Submitted', this.contact);
    // Handle form submission here (e.g., send data to API)
    alert('Message sent successfully!');
    form.reset();
  }
}
}