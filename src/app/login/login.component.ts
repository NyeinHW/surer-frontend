import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem('token','');
  }
   onSubmit() {
  // TODO: Use EventEmitter with form value
    this.http.post(`https://localhost:44331/api/userapi/loginUser`,this.loginForm.value)
    .subscribe((data:any) => {
                    if(data.code== 200){
                       localStorage.setItem('token', data.token);
                       localStorage.setItem('userId',data.user.Id);
                        this.router.navigate(['/carpark']);
                    }
                    else{
                         this.router.navigate(['/']);                     
                    }
                    console.warn("result",localStorage.getItem('token'));
                    console.warn("userid is",data.user.Id)
                },
                error => {
                  console.warn("error here");
                });
    console.warn(this.loginForm.value);
  }

}
