import { Component } from '@angular/core';
import * as Graph from 'src/generated/graphql';
import * as Plyr from 'plyr';
import * as Hls from 'hls.js';
import { AUTHTOKEN } from '../constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  login: Graph.LoginMutation['tokenAuth'];
  token:any;
  constructor(private verifyGQL:Graph.VerifyGQL) {
    this.token = localStorage.getItem(AUTHTOKEN);
  }


  public player;
  ngOnInit(){
    this.verifyGQL.mutate({
      token:this.token
    }).subscribe(next=>
      {
        let a = next.data.verifyToken.payload;
        let b = JSON.stringify(a);
        let c = JSON.parse(b)
        let d = c.stream_link ;
        if(d != "No Place For Cheaters"){
          const source = d ;
          this.player = new Plyr('#plyrID', { captions: { active: true } });

	        const video = document.querySelector('video');
          const hls = new Hls();
		      hls.loadSource(source);
		      hls.attachMedia(video);
        }
        else{
          console.log("same user");
        }
      })

  }

}
