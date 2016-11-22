import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'modal',
  template: `<modal #myModal>
                    <div>
                    username <input type="text" [(ngModel)]="fbUsername">
                    </div>
                    <div>
                    password <input type="text" [(ngModel)]="fbPassword">
                    </div>
                    <button (click)="fbLogin()">submit</button>
                    <button (click)="close()">close</button>
            </modal>`
})

export class CustomModal {
  
  fbUsername: String;
  fbPassword: String;

}