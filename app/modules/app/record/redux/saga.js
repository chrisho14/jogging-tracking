import { fork, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';

import * as CONSTANTS from './constants';
import {
  recordListSuccess,
  recordListError,
  recordReportSuccess,
  recordReportError,
  recordLoadSuccess,
  recordLoadError,
  recordSaveSuccess,
  recordSaveError,
  recordDeleteSuccess,
  recordDeleteError,
} from './actions';
import { selectRecord } from './selectors';

export function* recordListRequest(action) {
  try {
    const data = yield call(request, `records?limit=${(action.limit ? action.limit : 0)}`, 'GET', null, true);
    yield put(recordListSuccess(data));
  } catch (err) {
    yield put(recordListError(err));
  }
}

export function* recordReportRequest() {
  try {
    const data = yield call(request, 'records/report', 'GET', null, true);
    yield put(recordReportSuccess(data));
  } catch (err) {
    yield put(recordReportError(err));
  }
}

export function* recordLoadRequest(action) {
  try {
    const data = yield call(request, `records/${action.id}`, 'GET', null, true);
    yield put(recordLoadSuccess(data));
  } catch (err) {
    yield put(recordLoadError(err));
  }
}

export function* recordDeleteRequest(action) {
  try {
    const data = yield call(request, `records/${action.id}`, 'DELETE', null, true);
    yield put(recordDeleteSuccess(action.id, data));
  } catch (err) {
    yield put(recordDeleteError(err));
  }
}

export function* recordSaveRequest() {
  try {
    const state = yield select();
    const record = selectRecord(state);
    const requestData = record.get('record').get('data').toJS();
    const id = record.get('record').get('id');
    let responseData = null;

    if (id === 'new') {
      responseData = yield call(request, 'records', 'POST', { ...requestData }, true);
    } else {
      responseData = yield call(request, `records/${id}`, 'PUT', { ...requestData }, true);
    }

    yield put(recordSaveSuccess(responseData));
    notify.success('Record saved');
  } catch (err) {
    yield put(recordSaveError(err));
  }
}

export default [
  fork(takeLatest, CONSTANTS.RECORD_LIST_REQUEST, recordListRequest),
  fork(takeLatest, CONSTANTS.RECORD_REPORT_REQUEST, recordReportRequest),
  fork(takeLatest, CONSTANTS.RECORD_LOAD_REQUEST, recordLoadRequest),
  fork(takeLatest, CONSTANTS.RECORD_SAVE_REQUEST, recordSaveRequest),
  fork(takeLatest, CONSTANTS.RECORD_DELETE_REQUEST, recordDeleteRequest),
];
