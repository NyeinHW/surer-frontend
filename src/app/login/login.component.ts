import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router';
import {baseUrl} from './../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 submitted = false;
 loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });
  constructor(private http:HttpClient,private router: Router) { }
  get f() { return this.loginForm.controls; }
  ngOnInit(): void {
    localStorage.setItem('token','');
  }
   onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

    /*if(this.loginForm.value.email == "" || this.loginForm.value.password ==""){
      window.alert("Please Enter Credentials");
      this.router.navigate(['/']);  
    }*/
    else{
      this.onLogin();
    }  
  }
  onLogin(){
    this.http.post(`${baseUrl}/userapi/loginUser`,this.loginForm.value)
    .subscribe((data:any) => {
                    if(data.code== 200){
                       localStorage.setItem('token', data.token);
                       localStorage.setItem('userId',data.user.Id);
                       localStorage.setItem('userName',data.user.FirstName+''+data.user.LastName);
                       this.router.navigate(['/carpark']);
                    }
                    else{
                        window.alert("Credentials is not correct");
                        this.router.navigate(['/']);                     
                    }
                    console.warn("result",localStorage.getItem('token'));
                    console.warn("userid is",data.user.Id)
                },
                error => {
                  window.alert("Something went wrong.Please LogIn again");
                  this.router.navigate(['/']);
                });
  }

}
