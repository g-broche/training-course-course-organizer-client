import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'client';

  @ViewChild('modalHost', { read: ViewContainerRef, static: true }) modalHost!: ViewContainerRef;

  constructor(private modalService: ModalService) { }

  ngAfterViewInit(): void {
    this.modalService.registerHost(this.modalHost);
  }
}