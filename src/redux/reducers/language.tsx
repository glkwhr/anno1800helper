import {Action, UPDATE_LANGUAGE} from "../actions/actionTypes";

const initialState: string = 'english';

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case UPDATE_LANGUAGE: {
      return action.payload.language;
    }
    default: {
      return state;
    }
  }
}