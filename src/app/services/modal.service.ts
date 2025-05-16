import { Injectable, Type, ViewContainerRef } from '@angular/core';
import { ModalContainerComponent } from '../components/modal-container/modal-container.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalHost: ViewContainerRef | null = null;

  registerHost(viewContainerRef: ViewContainerRef) {
    this.modalHost = viewContainerRef;
  }

  open<T extends object>(component: Type<T>, data?: Partial<T>): T {
    if (!this.modalHost) throw new Error('Modal host not registered.');

    this.modalHost.clear();

    const modalRef = this.modalHost.createComponent(ModalContainerComponent);
    const contentRef = modalRef.instance.container.createComponent(component);

    if (data) {
      Object.assign(contentRef.instance, data);
    }

    modalRef.instance.close = () => this.modalHost?.clear();

    return contentRef.instance;
  }

  close() {
    this.modalHost?.clear();
  }
}