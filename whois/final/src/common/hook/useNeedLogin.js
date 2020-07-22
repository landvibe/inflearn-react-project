import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AuthStatus } from '../constant';

export default function useNeedLogin() {
  const history = useHistory();
  const status = useSelector(state => state.auth.status);
  useEffect(() => {
    if (status === AuthStatus.NotLogin) {
      history.replace('/login');
    }
  }, [status, history]);
}
