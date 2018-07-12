import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const newRecord = {
  duration: 0,
  distance: 0,
  date: new Date(),
};

const initalState = fromJS({
  records: {
    list: [],
    loading: false,
  },
  report: {
    list: [],
    loading: false,
  },
  record: {
    id: '',
    data: {},
    error: [],
    loading: false,
  },
});

function recordReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.LOAD_NEW_RECORD:
      return state.set('record', fromJS({
        data: newRecord,
        id: 'new',
        error: [],
        loading: false,
      }));
    case CONSTANTS.RECORD_LIST_REQUEST:
      return state.setIn(['records', 'loading'], true);
    case CONSTANTS.RECORD_LIST_SUCCESS:
      return state.setIn(['records', 'list'], fromJS(action.data))
        .setIn(['records', 'loading'], false);
    case CONSTANTS.RECORD_LIST_ERROR:
      return state.setIn(['records', 'loading'], false);
    case CONSTANTS.RECORD_REPORT_REQUEST:
      return state.setIn(['report', 'loading'], true);
    case CONSTANTS.RECORD_REPORT_SUCCESS:
      return state.setIn(['report', 'list'], fromJS(action.data))
        .setIn(['report', 'loading'], false);
    case CONSTANTS.RECORD_REPORT_ERROR:
      return state.setIn(['report', 'loading'], false);
    case CONSTANTS.RECORD_DELETE_REQUEST:
      return state.setIn(['records', 'loading'], true)
        .setIn(['record', 'loading'], true);
    case CONSTANTS.RECORD_DELETE_SUCCESS:
      {
        const recordList = state.getIn(['records', 'list']);
        const filteredList = recordList.filter((record) => record.get('_id') !== action.id);
        return state.setIn(['records', 'list'], fromJS(filteredList))
          .setIn(['records', 'loading'], false)
          .setIn(['record', 'loading'], false);
      }
    case CONSTANTS.RECORD_DELETE_ERROR:
      return state.setIn(['records', 'loading'], false)
        .setIn(['record', 'loading'], false);
    case CONSTANTS.RECORD_LOAD_REQUEST:
      return state.setIn(['record', 'loading'], true);
    case CONSTANTS.RECORD_LOAD_SUCCESS:
      return state.setIn(['record', 'data'], fromJS(action.data))
        .setIn(['record', 'id'], action.data._id)
        .setIn(['record', 'loading'], false);
    case CONSTANTS.RECORD_LOAD_ERROR:
      return state.setIn(['record', 'loading'], false);
    case CONSTANTS.RECORD_SAVE_REQUEST:
      return state.setIn(['record', 'loading'], true)
        .setIn(['record', 'error'], fromJS([]));
    case CONSTANTS.RECORD_SAVE_SUCCESS:
      return state
        .setIn(['record', 'id'], action.data._id)
        .setIn(['record', 'data', 'id'], action.data._id)
        .setIn(['record', 'loading'], false);
    case CONSTANTS.RECORD_SAVE_ERROR:
      return state.setIn(['record', 'loading'], false)
        .setIn(['record', 'error'], fromJS(action.data.error));
    case CONSTANTS.UPDATE_RECORD_FIELD:
      return state.setIn(['record', 'data', action.field], action.value);
    default:
  }

  return state;
}

export default recordReducer;
