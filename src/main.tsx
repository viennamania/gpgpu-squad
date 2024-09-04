import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import {ThirdwebProvider} from 'thirdweb/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import App from './App.tsx';
import './index.css';
import {WsProvider} from './contexts/WsProvider.js';
import SalePeriodProvider from './contexts/SalePeriodProvider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThirdwebProvider>
            <SalePeriodProvider>
              <WsProvider>
                <App />
              </WsProvider>
            </SalePeriodProvider>
          </ThirdwebProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
