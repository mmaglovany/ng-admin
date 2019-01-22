import {Component, ComponentFactoryResolver, Injectable, NgModule, ViewContainerRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClarityModule} from '@clr/angular';

export interface Button {
  title: string;
  resolve?: any;
}

export interface DialogOptions {
  ref: ViewContainerRef;
  title?: string;
  content?: string;
  buttons?: Button[];
}

@Injectable()
export class DialogWindow {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public open(options: DialogOptions) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const ref = options.ref;
    const componentRef = ref.createComponent(componentFactory);

    componentRef.instance.title = options.title;
    componentRef.instance.content = options.content;
    componentRef.instance.buttons = options.buttons;

    componentRef.instance.close = function () {
      componentRef.destroy();
    };

  }

}

@Component({
  selector: 'lq-modal-window',
  template: `
    <div class="modal">
      <div class="modal-dialog" role="dialog" aria-hidden="true">
        <div class="modal-content">
          <div class="modal-header">
            <button aria-label="Close" class="close" type="button" (click)="close()">
              <clr-icon aria-hidden="true" shape="close"></clr-icon>
            </button>
            <h3 class="modal-title">{{title}}</h3>
          </div>
          <div class="modal-body" [innerHtml]="content"></div>
          <div class="modal-footer">
            <button class="btn" *ngFor="let button of _buttons" (click)="doClick(button)">{{button.title}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop" aria-hidden="true"></div>
  `
})
export class ModalComponent {

  title = '';
  content = '';

  _buttons: Button[] = [
    {title: 'Close'}
  ];

  set buttons(value) {
    if (value) {
      this._buttons = value;
    }
  }

  close() {
  }

  doClick(button) {
    if (button.resolve) {
      button.resolve();
    }
    this.close();
  }
}


@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  entryComponents: [
    ModalComponent
  ],
  declarations: [
    ModalComponent
  ],
  providers: [
    DialogWindow
  ]
})
export class ModalWindowModule {

}
