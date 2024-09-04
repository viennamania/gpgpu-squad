import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';

import NodeSale from '../components/node';
import {formState} from '../atoms/form';

const NodePage = () => {
  const location = useLocation();
  const setForm = useSetRecoilState(formState);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      setForm((prev) => ({...prev, code}));
    }
  }, [location.search, setForm]);

  return <NodeSale />;
};

export default NodePage;
