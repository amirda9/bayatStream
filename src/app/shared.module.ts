import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TimerComponent } from "./timer/timer.component";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,

  ],
  exports:[TimerComponent],
  declarations: [TimerComponent],
})
export class SharedModuleModule {}
