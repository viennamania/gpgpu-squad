import {useRecoilValue} from 'recoil';
import {Outlet, useLocation} from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';

import Navbar from './Navbar';
import Footer from './Footer';
import ToastContainer from '../components/ToastContainer';
import {menuDrawerState} from '../atoms/menu';
import {joinState} from '../atoms/squad';

const Layout = () => {
  const location = useLocation();
  const isShowMenuDrawer = useRecoilValue(menuDrawerState);
  const isJoin = useRecoilValue(joinState);

  return (
    <Dialog.Root>
      <div
        className={`relative mx-auto flex min-h-screen flex-col items-center ${location.pathname === '/' && 'squad_bg'} ${!isJoin && 'squad_bg_none'}`}>
        <Navbar />
        <div
          className={`mt-[64px] w-full flex-1 ${isShowMenuDrawer && 'blur-md lg:blur-none'}`}>
          <ToastContainer />
          {/** 추후 삭제 */}
          {/* <div className="flex w-full flex-col items-center">
            <label>
              화이트리스트 테스트:{' '}
              <input
                className="rounded-xl border border-[#737780] bg-transparent px-2.5 py-1.5 text-white"
                type="datetime-local"
                value={dayjs(whitelistDate)
                  .utc(false)
                  .format('YYYY-MM-DDTHH:mm:ss')}
                onChange={(e) => {
                  const newDate = dayjs(e.target.value).utc(true).toISOString();

                  setWhitelistDate(newDate);
                }}
                step="1"
              />
            </label>
            <label>
              퍼블릭 테스트:{' '}
              <input
                className="rounded-xl border border-[#737780] bg-transparent px-2.5 py-1.5 text-white"
                type="datetime-local"
                value={dayjs(publicDate)
                  .utc(false)
                  .format('YYYY-MM-DDTHH:mm:ss')}
                onChange={(e) => {
                  const newDate = dayjs(e.target.value).utc(true).toISOString();

                  setPublicDate(newDate);
                }}
                step="1"
              />
            </label>
          </div> */}
          <Outlet />
        </div>
        <Footer />
      </div>
    </Dialog.Root>
  );
};

export default Layout;
