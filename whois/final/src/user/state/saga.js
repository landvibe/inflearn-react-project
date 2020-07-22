import { all, call, put, takeLeading } from 'redux-saga/effects';
import { Types, actions } from '.';
import { callApi } from '../../common/util/api';
import { makeFetchSaga, deleteApiCache } from '../../common/util/fetch';

function* fetchUser({ name }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/search',
    params: { keyword: name },
  });

  if (isSuccess && data) {
    const user = data.find(item => item.name === name);
    if (user) {
      yield put(actions.setValue('user', user));
    }
  }
}

function* fetchUpdateUser({ user, key, value }) {
  const oldValue = user[key];
  yield put(actions.setValue('user', { ...user, [key]: value }));
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/update',
    method: 'post',
    data: { name: user.name, key, value, oldValue },
  });

  if (isSuccess && data) {
    deleteApiCache();
    yield put(actions.addHistory(data.history));
  } else {
    yield put(actions.setValue('user', user));
  }
}

function* fetchUserHistory({ name }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/history',
    params: { name },
  });

  if (isSuccess && data) {
    yield put(actions.setValue('userHistory', data));
  }
}

export default function* () {
  yield all([
    takeLeading(
      Types.FetchUser,
      makeFetchSaga({ fetchSaga: fetchUser, canCache: false }),
    ),
    takeLeading(
      Types.FetchUpdateUser,
      makeFetchSaga({ fetchSaga: fetchUpdateUser, canCache: false }),
    ),
    takeLeading(
      Types.FetchUserHistory,
      makeFetchSaga({ fetchSaga: fetchUserHistory, canCache: false }),
    ),
  ]);
}
