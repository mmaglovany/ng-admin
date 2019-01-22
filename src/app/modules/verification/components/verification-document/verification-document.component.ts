import {Component, Input, OnInit} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {State} from '../../../../core/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {DoLoadDocument, VerifyActionTypes} from '../../store/verify.actions';
import {OnLoadAccounts} from '../../../accounts/store/accounts.actions';
import {map} from 'rxjs/operators';

@Component({
  selector: 'lq-verification-document',
  templateUrl: './verification-document.component.html',
  styleUrls: ['./verification-document.component.scss']
})
export class VerificationDocumentComponent implements OnInit {

  @Input() pid: string;
  public src;

  constructor(private actions$: Actions,
              private store$: Store<State>) {
  }

  public document$ = this.actions$.pipe(
    ofType(VerifyActionTypes.ON_LOAD_DOCUMENT),
    map((action: OnLoadAccounts) => {
      const blob = action.payload;
      const reader = new FileReader();
      reader.onload = (data: any) => {
        this.src = data.target.result;
      };

      reader.readAsDataURL(blob);
    })
  );

  ngOnInit() {
    this.store$.dispatch(new DoLoadDocument({pid: this.pid}));
  }

}
