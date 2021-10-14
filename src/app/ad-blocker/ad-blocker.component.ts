import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-ad-blocker',
  templateUrl: './ad-blocker.component.html',
  styleUrls: ['./ad-blocker.component.scss'],
  animations: [
    trigger('shakeit', [
      state('shakestart', style({
        transform: 'scale(1)',
      })),
      state('shakeend', style({
        transform: 'scale(1)',
      })),
      transition('shakestart => shakeend', animate('1000ms ease-in', keyframes([
        style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.1 }),
        style({ transform: 'translate3d(2px, 0, 0)', offset: 0.2 }),
        style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.3 }),
        style({ transform: 'translate3d(4px, 0, 0)', offset: 0.4 }),
        style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.5 }),
        style({ transform: 'translate3d(4px, 0, 0)', offset: 0.6 }),
        style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.7 }),
        style({ transform: 'translate3d(2px, 0, 0)', offset: 0.8 }),
        style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.9 }),
      ]))),
    ])]
})
export class AdBlockerComponent implements OnInit, OnDestroy {

  isBlocked = true;
  states = {};
  sub: Subscription;
  @Input() showContent = false;
  @Output() blocker = new EventEmitter<any>();

  constructor(private _common: CommonService) {
    this.states['state1'] = 'shakestart';
    this.states['state2'] = 'shakestart';
  }

  ngOnInit() {
    console.log(document.getElementsByClassName('ads-section')[0].clientWidth, '-addd');
    if (document.getElementsByClassName('ads-section')[0].clientWidth === 0) {
    this.blocker.emit(true);
    this.isBlocked = true;
    } else {
      this.isBlocked = false;
      this.blocker.emit(false);
    }
    this.sub = this._common.shakeAdBlock.subscribe(value => {
      if (value) {
        this.shakeMe('state1');
      }
    });
  }

  shakeMe(stateVar: string) {
    this.states[stateVar] = (this.states[stateVar] === 'shakestart' ? 'shakeend' : 'shakestart');
  }

  shakeEnd(stateVar: string, event) {
    this.states[stateVar] = 'shakeend';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
