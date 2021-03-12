import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { ModalPageComponent } from './modal-page/modal-page.component';
import { SharedModuleModule } from './shared.module';

@NgModule({
  declarations: [AppComponent,ModalPageComponent],
  entryComponents: [],
  imports: [BrowserModule,HttpClientModule, IonicModule.forRoot(), AppRoutingModule,GraphQLModule,SharedModuleModule],
  exports:[ModalPageComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory: (httpLink: HttpLink) => {
    //     return {
    //       cache: new InMemoryCache(),
    //       link: httpLink.create({
    //         uri: 'https://shaya.liara.run/graphql',
    //       }),
    //     };
    //   },
    //   deps: [HttpLink],
    // }
  ],
  bootstrap: [AppComponent],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
