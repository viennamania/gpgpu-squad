import {Route, Routes, Navigate} from 'react-router-dom';

import Layout from './layouts';
import GpPage from './pages/GpPage';
import StakePage from './pages/StakePage';

import NodePage from './pages/NodePage';

import SquadPage from './pages/SquadPage';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/squad" replace />}></Route>
        <Route path="/node" element={<NodePage />}></Route>
        <Route path="/stake" element={<StakePage />}></Route>
        <Route path="/gp" element={<GpPage />}></Route>
        <Route path="/squad" element={<SquadPage />}></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
