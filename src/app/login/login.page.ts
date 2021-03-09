import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AUTHTOKEN, STREAMLINK } from '../constants';
import { LoginGQL,LoginMutation,VerifyGQL } from 'src/generated/graphql';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { throwServerError } from '@apollo/client/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ModalPageComponent } from '../modal-page/modal-page.component';
import { AuthService } from '../auth.service';

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
  constructor(private router :Router , private loginGQL:LoginGQL , private modal:ModalController, private loadingController:LoadingController,private authservice:AuthService, private verifyGQL:VerifyGQL,public alertController: AlertController) {

  }

  ngOnInit() {
    let token = localStorage.getItem(AUTHTOKEN);
    if(token != null){
      this.verifyGQL.mutate(
        {
          token:localStorage.getItem(AUTHTOKEN)
        }
      ).subscribe(
        res=>{
          this.router.navigate(['/home']);
        }
      )
      console.log("1");
    }
    else{
      return;
    }
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
      // const loading = await this.loadingController.create({
      //   message: 'در حال بارگزاری ...'
      //   });
      //   loading.present();
      // this.login()
      // loading.dismiss();
      this.login();
    }
  }

 async login(){
    this.loginGQL.mutate(
      {
        username:this.user,
        password:this.pass
      }
    ).subscribe(
      async next=>
      {
        if(next.data.tokenAuth.token != null){
          let a = next.data.tokenAuth.token;
          let b = next.data.tokenAuth.user.loggedInUser.streamLink;
          // b = "https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8"
          localStorage.setItem(AUTHTOKEN,a);
          localStorage.setItem(STREAMLINK,b);
          if(b != ""){
          this.router.navigate(['/home']);
          }
          else if(b == ""){
            // this.status = true;
            // let a = next.data.tokenAuth.token;
            // localStorage.setItem(AUTHTOKEN,a);
            // this.run_modal()
            const alert = await this.alertController.create({
              cssClass: 'my-logout-class',
              // header: 'Alert',
              // subHeader: 'Subtitle',
              message: '!شما با دستگاه دیگری وارد شده اید',
              buttons: [ {text:'خروج از تمام دستگاه ها' ,cssClass:'retry_btn', handler: () => {
                this.authservice.logout();
              }}]
            });

            await alert.present();
            // this.router.navigate(['/home']);
          }
        }
      },

      async errors=>{
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          // header: 'Alert',
          // subHeader: 'Subtitle',
          message: '.نام کاربری یا رمز عبور شما صحیح نمی باشد',
          buttons: [{text:'تلاش مجدد',cssClass:'logout_btn'}]
        });

        await alert.present();

      }
    )
  }
}
