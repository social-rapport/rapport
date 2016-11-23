import { Component, ViewChild} from '@angular/core';
import { OnInit } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'home',
  styleUrls: ['app/home-page/home.component.css'],
  template: `
  <modal #myModal [keyboard]="false" [backdrop]="'static'">
    <div><img src="http://phylo.cs.mcgill.ca/assets/img/loading.gif"/ >
    Loading Your Personalized Bots</div>
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