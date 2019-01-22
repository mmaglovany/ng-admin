import {APP_START_AJAX, APP_STOP_AJAX, AppActions} from '../actions/app.actions';

export interface State {
  ajax: boolean;
}

const initialState: State = {
  ajax: false,
};

export function reducer(state = initialState, action: AppActions): State {

  switch (action.type) {
    case APP_START_AJAX:
      return {ajax: true};

    case APP_STOP_AJAX:
      return {ajax: false};

    default:
      return state;
  }

}

export const getAjaxState = (state: State) => state.ajax;
