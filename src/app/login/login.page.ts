import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AUTHTOKEN } from '../constants';
import { LoginGQL,LoginMutation } from 'src/generated/graphql';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { throwServerError } from '@apollo/client/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // constructor(profileGQL: ProfileGQL , private authService: AuthService) {

  //   this.profile = profileGQL.watch(
  //   ).valueChanges.pipe(map(result => result.data.affiliateList.edges));
  // }
  is_TextFieldType : boolean = false;
  user:string;
  pass:string;
  constructor(private router :Router , private loginGQL:LoginGQL) {

  }

  ngOnInit() {
  }



  togglePasswordFieldType(){
    this.is_TextFieldType = ! this.is_TextFieldType;
  }

  login(){
    this.loginGQL.mutate(
      {
        username:this.user,
        password:this.pass
      }
    ).subscribe(
      next=>
      {
        if(next.data.tokenAuth.token != null){
          let a = next.data.tokenAuth.token;
          localStorage.setItem(AUTHTOKEN,a);
          this.router.navigate(['/home']);
        }
      }
    )
  }
}
