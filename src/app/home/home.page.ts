import { Component } from '@angular/core';
import * as Graph from 'src/generated/graphql';
import * as Plyr from 'plyr';
import * as Hls from 'hls.js';
import { AUTHTOKEN } from '../constants';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  login: Graph.LoginMutation['tokenAuth'];
  token:any;
  count:number=27;
  status:boolean=true;
  subscription: Subscription;
  constructor(private http : HttpClient,private verifyGQL:Graph.VerifyGQL,private loadingController:LoadingController,private authService:AuthService,private router:Router) {
    this.token = localStorage.getItem(AUTHTOKEN);
    const source = interval(30000);
    this.subscription = source.subscribe(val => this.verifytoken());
  }


  public player;
  ngOnInit(){
    this.func();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.authService.logout();
  }

  verifytoken(){
    this.verifyGQL.mutate({
      token:localStorage.getItem(AUTHTOKEN)
    }).subscribe(res=>
      {
        console.log(res)
      },
      error=>{
        // console.log("behnam");
        this.router.navigate(['/login']);
      })
  }

  logout(){
    this.authService.logout();
  }

  async  func(){
    const loading = await this.loadingController.create({
      message: 'در حال بارگزاری ...'
      });
      loading.present();
    this.verifyGQL.mutate({
      token:this.token
    }).subscribe(async next=>
      {
        if(this.status){

          const headerDict = {
            'Authorization' : 'Apikey ab1d728f-70ef-49df-896e-7fb70607616b'
          }
          let params ={
            headers : new HttpHeaders(headerDict),
          }
          // this.http.get("https://napi.arvancloud.com/live/2.0/streams/7451021d-29b4-4e47-9344-cafdda924c42", params).subscribe(

          //   res => {

          //     let a = JSON.stringify(res);
          //     let b = JSON.parse(a);
          //     let c = b.data.hls_playlist;
          //     console.log(b.data.convert_info[0]);
              let a = localStorage.getItem('STREAMLINK');
              if(a != ""){
              const source = a;
          //     // this.player = new Plyr('#plyrID', { quality:b.data.convert_info });

                const video = document.querySelector('video');
                const hls = new Hls();
                hls.loadSource(source);
                hls.attachMedia(video);

          //       /////my quality code here

                hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                  const availableQualities = hls.levels.map((l) => l.height)
                 let defaultOptions={
              quality : {
                default: availableQualities[0],
                options: availableQualities,
                forced: true,
                onChange: (e) =>updateQuality(e)
                // hls.levels.forEach((level, levelIndex) => {
                //   if (level.height === e) {
                //     hls.currentLevel = levelIndex
                //   }
                // }),
                // },

            },
              captions :{
                active: true,
                update: true,
                language: 'en',
              }
            };
            function updateQuality(newQuality) {
              hls.levels.forEach((level, levelIndex) => {
                if (level.height === newQuality) {
                  hls.currentLevel = levelIndex
                }
              })
            }
            this.player = new Plyr(video, defaultOptions);
            hls.attachMedia(video);
          }),





          loading.dismiss();
        }

        else if(a==""){
          console.log("error")

        }
        loading.dismiss();
        }

            });


            /////end of subscribe


            // loading.dismiss();










        }


      }

