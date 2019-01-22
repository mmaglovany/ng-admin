import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageForm} from '../../intarfaces/message-form';

@Component({
  selector: 'lq-support-message-form',
  templateUrl: './support-message-form.component.html',
  styleUrls: ['./support-message-form.component.scss']
})
export class SupportMessageFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();
  @Input() error: any;
  @Input() status: string;

  constructor(private formBuilder: FormBuilder) {
  }

  public form: FormGroup = this.formBuilder.group({
    message: ['', Validators.required],
    status: ['', Validators.required]
  });

  ngOnInit(): void {
    this.form.patchValue({status: this.status});
  }

  public clearForm() {
    this.form.reset();
  }

  onSubmitForm() {
    this.onSubmit.emit(this.form.value);
  }

}
