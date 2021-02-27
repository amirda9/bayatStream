import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AUTHTOKEN, STREAMLINK } from '../constants';
import { LoginGQL,LoginMutation } from 'src/generated/graphql';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { throwServerError } from '@apollo/client/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalPageComponent } from '../modal-page/modal-page.component';

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
  status:boolean=false;
  constructor(private router :Router , private loginGQL:LoginGQL , private modal:ModalController, private loadingController:LoadingController) {

  }

  ngOnInit() {
  }



  togglePasswordFieldType(){
    this.is_TextFieldType = ! this.is_TextFieldType;
  }

  async run_modal(){
    const modal = await this.modal.create({
      component: ModalPageComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  
 async keyDownFunction(event) {
    if (event.keyCode === 13) {
      const loading = await this.loadingController.create({
        message: 'در حال بارگزاری ...'
        });
        loading.present();
      this.login()
      loading.dismiss();
    }
  }

 async login(){
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
          let b = next.data.tokenAuth.user.loggedInUser.streamLink;
          localStorage.setItem(AUTHTOKEN,a);
          localStorage.setItem(STREAMLINK,b);
          if(b != ""){
          this.router.navigate(['/home']);
          }
          else if(b == ""){
            // this.status = true;
            // let a = next.data.tokenAuth.token;
            // localStorage.setItem(AUTHTOKEN,a);
            this.run_modal()
            // this.router.navigate(['/home']);
          }
        }
      }
    )
  }
}
