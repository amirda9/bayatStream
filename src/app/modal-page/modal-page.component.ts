import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {

  constructor(private authservice:AuthService,private modalCtrl:ModalController,private http : HttpClient) { }

  ngOnInit() {
    const headerDict = {
      'Authorization' : 'Apikey dfa8d34c-1709-4203-be3a-e9982270704b'
    }
    let params ={
      headers : new HttpHeaders(headerDict),
    }
    this.http.get("https://napi.arvancloud.com/vod/2.0/channels/b73c1b7c-cf46-4bfe-a859-c29ccf26d132/videos", params).subscribe(
      res=>{
        console.log(res);
      }
    );
  }


  close(){
    this.modalCtrl.dismiss();
  }
}
