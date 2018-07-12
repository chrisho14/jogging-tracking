import { createSelector } from 'reselect';

const selectRecord = (state) => state.get('app').get('record');

const makeSelectRecordList = () => createSelector(
  selectRecord,
  (recordState) => recordState.getIn(['records', 'list']),
);

const makeSelectRecordListLoading = () => createSelector(
  selectRecord,
  (recordState) => recordState.getIn(['records', 'loading']),
);

const makeSelectRecordReport = () => createSelector(
  selectRecord,
  (recordState) => recordState.getIn(['report', 'list']),
);

const makeSelectRecordReportLoading = () => createSelector(
  selectRecord,
  (recordState) => recordState.getIn(['report', 'loading']),
);

const makeSelectRecord = () => createSelector(
  selectRecord,
  (recordState) => recordState.getIn(['record', 'data']),
);

const makeSelectRecordLoading = () => createSelector(
  selectRecord,
  (recordState) => recordState.getIn(['record', 'loading']),
);

export {
  selectRecord,
  makeSelectRecordList,
  makeSelectRecordListLoading,
  makeSelectRecord,
  makeSelectRecordLoading,
  makeSelectRecordReport,
  makeSelectRecordReportLoading,
};
