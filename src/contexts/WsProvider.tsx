import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  FC,
} from 'react';
import {throttle} from 'lodash';

interface WsContextType {
  price: number | null;
}

const WsContext = createContext<WsContextType | undefined>(undefined);

interface WsProviderProps {
  children: ReactNode;
}

export const WsProvider: FC<WsProviderProps> = ({children}) => {
  const ws = useRef<WebSocket | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const throttledSetPrice = useRef(
    throttle((tradePrice: number) => {
      setPrice(tradePrice);
    }, 10000),
  ).current;

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(`wss://fstream.binance.com/ws/ethusdt@trade`);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
      };

      ws.current.onmessage = (event) => {
        if (event.data) {
          const parsed = JSON.parse(event.data);
          const tradePrice = parseFloat(parsed['p']);
          throttledSetPrice(tradePrice);
          //console.log(tradePrice);
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected');
      };
    }

    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [throttledSetPrice]);

  return <WsContext.Provider value={{price}}>{children}</WsContext.Provider>;
};

export const useWsPrice = (): WsContextType => {
  const context = useContext(WsContext);
  if (context === undefined) {
    throw new Error('useWsPrice must be used within a WsProvider');
  }
  return context;
};
