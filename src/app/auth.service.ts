import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LogoutGQL } from 'src/generated/graphql';
import { AUTHTOKEN, STREAMLINK } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private logoutGQL:LogoutGQL,private router:Router , private apollo:Apollo) { }


  logout(){
    this.logoutGQL.mutate().subscribe(
      next=>{
        console.log(next);
        localStorage.removeItem(AUTHTOKEN);
    localStorage.removeItem(STREAMLINK);
    this.apollo.client.resetStore();
    this.router.navigate(['/login']);
      }
    );

    // console.log("1");

  }


}
