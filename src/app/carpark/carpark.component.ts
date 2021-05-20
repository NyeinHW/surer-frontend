import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Router} from '@angular/router';
@Component({
  selector: 'app-carpark',
  templateUrl: './carpark.component.html',
  styleUrls: ['./carpark.component.css']
})
export class CarparkComponent implements OnInit {
  carInfo:any;
  userName:any;
  constructor(private http:HttpClient,private router: Router) {
    this.userName=localStorage.getItem("userName");
   }

  ngOnInit() {
     const headerDict = {
      'Authorization':`Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': '*'
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    this.http.get(`https://localhost:44331/api/userapi/getCarPark`,requestOptions)
    .subscribe((data:any) => {
                    console.warn("result is",data);
                    this.carInfo=data.items[0].carpark_data;
                    console.warn("info is",data.items[0].carpark_data);
                },
                error => {
                  console.warn("error here");
                });
  }

}
