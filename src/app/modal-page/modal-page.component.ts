import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {

  constructor(private authservice:AuthService,private modalCtrl:ModalController) { }

  ngOnInit() {}

  logout() {
    this.authservice.logout();
    this.modalCtrl.dismiss();
  }
}
