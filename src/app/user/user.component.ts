import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Router} from '@angular/router';
import {baseUrl} from './../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user:any;
  constructor(private http:HttpClient,private router: Router) { }

  ngOnInit() {
      if(localStorage.getItem('token')==null){
        window.alert("You have no access .Pls LogIn");
        this.router.navigate(['/']); 
      }
     else{
       this.onViewList();
     }
     
  }
  onViewList(){
    const headerDict = {
      'Authorization':`Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': '*'
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
     var userId=localStorage.getItem('userId');
    this.http.get(`${baseUrl}/userapi/ViewUser?userId=${userId}`,requestOptions)
    .subscribe((data:any) => {
                    console.warn("user is",data);
                    this.user=data;
                },
                error => {
                  window.alert("You have no access.Pls LogIn");
                     this.router.navigate(['/']); 
                });
  }
  getCarList(){
    this.router.navigate(['/carpark']);
  }
  logOut(){
    this.router.navigate(['/']);
  }

}
