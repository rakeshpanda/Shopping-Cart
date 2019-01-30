import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  messageText :string;
   visible = false;
   visibleAnimate = false;

   show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

   hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

   onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}
