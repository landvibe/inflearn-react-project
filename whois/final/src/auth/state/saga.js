import { all, put, call, takeLeading } from 'redux-saga/effects';
import { actions, Types } from './index';
import { callApi } from '../../common/util/api';
import { makeFetchSaga } from '../../common/util/fetch';

function* fetchLogin({ name, password }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/auth/login',
    method: 'post',
    data: {
      name,
      password,
    },
  });

  if (isSuccess && data) {
    yield put(actions.setUser(data.name));
  }
}

function* fetchSignup({ email }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/auth/signup',
    method: 'post',
    data: {
      email,
    },
  });

  if (isSuccess && data) {
    yield put(actions.setUser(data.name));
  }
}

function* fetchUser() {
  const { isSuccess, data } = yield call(callApi, {
    url: '/auth/user',
  });

  if (isSuccess && data) {
    yield put(actions.setUser(data.name));
  }
}

function* fetchLogout() {
  const { isSuccess } = yield call(callApi, {
    url: '/auth/logout',
  });

  if (isSuccess) {
    yield put(actions.setUser(''));
  }
}

export default function* () {
  yield all([
    takeLeading(
      Types.FetchLogin,
      makeFetchSaga({ fetchSaga: fetchLogin, canCache: false }),
    ),
    takeLeading(
      Types.FetchSignup,
      makeFetchSaga({ fetchSaga: fetchSignup, canCache: false }),
    ),
    takeLeading(
      Types.FetchUser,
      makeFetchSaga({ fetchSaga: fetchUser, canCache: false }),
    ),
    takeLeading(
      Types.FetchLogout,
      makeFetchSaga({ fetchSaga: fetchLogout, canCache: false }),
    ),
  ]);
}
