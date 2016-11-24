import { Component, ViewChild} from '@angular/core';
import { OnInit } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'home',
  styleUrls: ['app/loading/loading.component.css'],
  template:
  `
  <modal #myModal id="loading" [keyboard]="false" [backdrop]="'static'">
      <div class="spinner">
        <img src="http://tecnoesis.in/Modules/img/drop16.gif" />
        <p class="spin">Waking Up Bots...</p>
      </div>
  </modal>
  `
})
export class LoadingComponent {
  constructor() {}

  @ViewChild('myModal')
  modal: ModalComponent;

  close() {
      this.modal.close();
  }

  open() {
      this.modal.open();
  }

  ngOnInit(): void {
    this.open();
  }

}