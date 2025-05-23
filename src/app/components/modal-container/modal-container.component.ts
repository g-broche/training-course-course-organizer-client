import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss'
})
export class ModalContainerComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  close = () => { };
}
