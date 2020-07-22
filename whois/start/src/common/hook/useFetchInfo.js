import { getFetchKey } from '../util/fetch';
import { useSelector, shallowEqual } from 'react-redux';
import { FetchStatus } from '../constant';
import { FETCH_KEY } from '../redux-helper';

export default function useFetchInfo(actionType, fetchKey) {
  const _fetchKey = getFetchKey({
    type: actionType,
    [FETCH_KEY]: fetchKey,
  });
  return useSelector(
    state => ({
      fetchStatus:
        state.common.fetchInfo.fetchStatusMap[actionType]?.[_fetchKey],
      isFetching:
        state.common.fetchInfo.fetchStatusMap[actionType]?.[_fetchKey] ===
        FetchStatus.Request,
      isFetched:
        state.common.fetchInfo.fetchStatusMap[actionType]?.[_fetchKey] ===
          FetchStatus.Success ||
        state.common.fetchInfo.fetchStatusMap[actionType]?.[_fetchKey] ===
          FetchStatus.Fail,
      isSlow: !!state.common.fetchInfo.isSlowMap[actionType]?.[_fetchKey],
      nextPage:
        state.common.fetchInfo.nextPageMap[actionType]?.[_fetchKey] || 0,
      totalCount:
        state.common.fetchInfo.totalCountMap[actionType]?.[_fetchKey] || 0,
      errorMessage:
        state.common.fetchInfo.errorMessageMap[actionType]?.[_fetchKey],
    }),
    shallowEqual,
  );
}
