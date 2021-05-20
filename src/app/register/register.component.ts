import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
    number:new FormControl('')
  });
  constructor(private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
  }
   onSubmit() {
  // TODO: Use EventEmitter with form value
    this.http.post(`https://localhost:44331/api/userapi/registerUser`,this.registerForm.value)
    .subscribe(data => {
                    this.router.navigate(['/login']);
                    console.warn("result",data);
                },
                error => {
                  console.warn("error here");
                });
    console.warn(this.registerForm.value);
  }
}
