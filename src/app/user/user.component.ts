import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Router} from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user:any;
  constructor(private http:HttpClient,private router: Router) { }

  ngOnInit() {
     var userId=localStorage.getItem('userId');
     console.warn("localstorage userid is",userId);
     const headerDict = {
      'Authorization':`Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': '*'
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    this.http.get(`https://localhost:44331/api/userapi/ViewUser?userId=${userId}`,requestOptions)
    .subscribe((data:any) => {
                    console.warn("user is",data);
                    this.user=data;
                },
                error => {
                  console.warn("error here");
                });
  }

}
