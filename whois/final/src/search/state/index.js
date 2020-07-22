import {
  createReducer,
  createSetValueAction,
  setValueReducer,
} from '../../common/redux-helper';

export const Types = {
  SetValue: 'search/SetValue',
  FetchAutoComplete: 'search/FetchAutoComplete',
  FetchAllHistory: 'search/FetchAllHistory',
};

export const actions = {
  setValue: createSetValueAction(Types.SetValue),
  fetchAutoComplete: keyword => ({
    type: Types.FetchAutoComplete,
    keyword,
  }),
  fetchAllHistory: () => ({ type: Types.FetchAllHistory }),
};

const INITIAL_STATE = {
  keyword: '',
  autoCompletes: [],
  history: [],
};
const reducer = createReducer(INITIAL_STATE, {
  [Types.SetValue]: setValueReducer,
});
export default reducer;
