import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface LoginInterface {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj : LoginInterface = {
    email: '',
    password: '',
  }

  onSubmit() {

    let dbUsers = localStorage.getItem('user_registration')

    if(dbUsers) {
      let dbUsersArr = JSON.parse(dbUsers);
      let status = dbUsersArr.find((item:LoginInterface) => item.email==this.loginObj.email && item.password==this.loginObj.password)

      if(status) {
        alert('Login Sucess');
        localStorage.setItem('current_user', JSON.stringify({...status}));
        window.location.replace('/profile')
      }else{
        alert('No user found, Make sure you have created account')
      }
    }else{
      alert('No user found, Make sure you have created account')
    }

  }

}
