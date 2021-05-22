import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router';
import {baseUrl} from './../../environments/environment'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   submitted = false;
   registerForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    number:new FormControl('')
  });
  constructor(private http:HttpClient,private router: Router) { }
  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
  }
   onSubmit() {
     this.submitted = true;
     if (this.registerForm.invalid) {
            return;
        }
    this.onRegister();
  }
  onRegister(){
     this.http.post(`${baseUrl}/userapi/registerUser`,this.registerForm.value)
    .subscribe((data:any) => {
                    if(data.code== 201){
                    window.alert("Registered successfully");
                    this.router.navigate(['/login']);
                    console.warn("result",data);
                    }
                    if(data.code == 409){
                      window.alert("Email already Existed!");
                      console.warn("code is ",data.code);
                      this.router.navigate(['/register']);
                    }
                },
                error => {
                  window.alert("Something went wrong,Please try again");
                  this.router.navigate(['/register']);
                  console.warn("error here");
                });
  }
  logIn(){
    this.router.navigate(['/login']);
  }
}
