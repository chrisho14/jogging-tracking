import userSaga from '../user/redux/saga';
import recordSaga from '../record/redux/saga';

export default function* appSaga() {
  yield []
    .concat(recordSaga)
    .concat(userSaga);
}
