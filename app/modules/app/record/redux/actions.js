import * as CONSTANTS from './constants';

export function recordListRequest(limit) {
  return {
    type: CONSTANTS.RECORD_LIST_REQUEST,
    limit,
  };
}

export function recordListSuccess(data) {
  return {
    type: CONSTANTS.RECORD_LIST_SUCCESS,
    data,
  };
}

export function recordListError(data) {
  return {
    type: CONSTANTS.RECORD_LIST_ERROR,
    data,
  };
}

export function recordReportRequest() {
  return {
    type: CONSTANTS.RECORD_REPORT_REQUEST,
  };
}

export function recordReportSuccess(data) {
  return {
    type: CONSTANTS.RECORD_REPORT_SUCCESS,
    data,
  };
}

export function recordReportError(data) {
  return {
    type: CONSTANTS.RECORD_REPORT_ERROR,
    data,
  };
}

export function recordLoadRequest(id) {
  return {
    type: CONSTANTS.RECORD_LOAD_REQUEST,
    id,
  };
}

export function recordLoadSuccess(data) {
  return {
    type: CONSTANTS.RECORD_LOAD_SUCCESS,
    data,
  };
}

export function recordLoadError(data) {
  return {
    type: CONSTANTS.RECORD_LOAD_ERROR,
    data,
  };
}

export function recordDeleteRequest(id) {
  return {
    type: CONSTANTS.RECORD_DELETE_REQUEST,
    id,
  };
}

export function recordDeleteSuccess(id, data) {
  return {
    type: CONSTANTS.RECORD_DELETE_SUCCESS,
    id,
    data,
  };
}

export function recordDeleteError(data) {
  return {
    type: CONSTANTS.RECORD_DELETE_ERROR,
    ...data,
  };
}

export function recordSaveRequest() {
  return {
    type: CONSTANTS.RECORD_SAVE_REQUEST,
  };
}

export function recordSaveSuccess(data) {
  return {
    type: CONSTANTS.RECORD_SAVE_SUCCESS,
    data,
  };
}

export function recordSaveError(data) {
  return {
    type: CONSTANTS.RECORD_SAVE_ERROR,
    data,
  };
}

export function loadNewRecord() {
  return {
    type: CONSTANTS.LOAD_NEW_RECORD,
  };
}

export function updateRecordField(field, value) {
  return {
    type: CONSTANTS.UPDATE_RECORD_FIELD,
    field,
    value,
  };
}
