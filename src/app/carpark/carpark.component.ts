import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Router} from '@angular/router';
import {baseUrl} from './../../environments/environment';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-carpark',
  templateUrl: './carpark.component.html',
  styleUrls: ['./carpark.component.css']
})
export class CarparkComponent implements OnInit {
   title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  carInfo:any;
  userName:any;
  constructor(private http:HttpClient,private router: Router) {
    this.userName=localStorage.getItem("userName");
   }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    if(localStorage.getItem('token')==null){
      window.alert("You have no access to list .Pls LogIn");
      this.router.navigate(['/']); 
    }
    this.onGetCarPark(); 
  }
  onGetCarPark(){
    const headerDict = {
      'Authorization':`Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': '*'
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
  this.http.get(`${baseUrl}/userapi/getCarPark`,requestOptions)
      .subscribe((data:any) => {
                      console.warn("result is",data);
                      this.carInfo=data.items[0].carpark_data;
                      console.warn("info is",data.items[0].carpark_data);
                      this.dtTrigger.next();
                  },
                  error => {
                     window.alert("You have no access to list .Pls LogIn");
                     this.router.navigate(['/']); 
                  });
  }
  getUser(){
    this.router.navigate(['/user']); 
  }
  logOut(){
    this.router.navigate(['/']);
  }

}
