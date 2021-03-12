import { Component, ElementRef, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl:'./timer.component.html'
})

export class TimerComponent implements OnInit {
  time_rem:boolean=true;
  private future: Date;
    private futureString: string;
    private counter$: Observable<number>;
    private subscription: Subscription;
    private message: string;

    constructor(elm: ElementRef) {
        this.futureString = elm.nativeElement.getAttribute('inputDate');
    }

    dhms(t) {
        if(t > 0){
        var days, hours, minutes, seconds;
        days = Math.floor(t / 86400);
        t -= days * 86400;
        hours = Math.floor(t / 3600) % 24;
        t -= hours * 3600;
        minutes = Math.floor(t / 60) % 60;
        t -= minutes * 60;
        seconds = t % 60;

        return [
            days + ' روز ' ,
            hours + ' ساعت ',
            minutes + ' دقیقه ',
            seconds + ' ثانیه ' ,



        ].join(' و ');
      }
      if(t <= 0){
        this.time_rem = false;
      }
    }



    ngOnInit() {
        this.future = new Date(this.futureString);
        interval(1000).subscribe(x => {
          this.message = this.dhms(Math.floor((this.future.getTime() - this.getNowUTC().getTime()) / 1000))

        });

        // this.subscription = this.counter$.subscribe((x) => this.message = this.dhms(x));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }


private getNowUTC() {
  const now = new Date();
  return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
}

}

