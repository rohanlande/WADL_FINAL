import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface RegisterInterface {
  name: string;
  email: string;
  password: string;
  roll_no: string;
  choice1: string;
  choice2: string;
  choice3: string;
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerObj : RegisterInterface = {
    name: '',
    email: '',
    password: '',
    roll_no: '',
    choice1: '',
    choice2: '',
    choice3: '',
  }

  onSubmit() {
    const newUser = {...this.registerObj};
    let dbUsers = localStorage.getItem('user_registration');
    let dbArr = !!dbUsers ?  JSON.parse(dbUsers)  : [];
    dbArr.push(newUser);
    localStorage.setItem('user_registration', JSON.stringify(dbArr));

    window.location.replace('/login')
  }
}
