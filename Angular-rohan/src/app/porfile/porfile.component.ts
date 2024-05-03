import { Component } from '@angular/core';
interface UserInterface {
  name: string;
  email: string;
  password: string;
  roll_no: string;
  choice1: string;
  choice2: string;
  choice3: string;
}
@Component({
  selector: 'app-porfile',
  standalone: true,
  imports: [],
  templateUrl: './porfile.component.html',
  styleUrl: './porfile.component.css'
})
export class PorfileComponent {
  user:UserInterface = {
    name: '',
    email: '',
    password: '',
    roll_no: '',
    choice1: '',
    choice2: '',
    choice3: '',
  }
  constructor() {
    let loggedUser = localStorage.getItem('current_user');
    if(!!loggedUser) {
      let userParse = JSON.parse(loggedUser)
      this.user = {...userParse}
    }else{
      window.location.replace('/login')
    }
  }
}
