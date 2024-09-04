import {Link, useLocation} from 'react-router-dom';
import {useState} from 'react';
import {useSetRecoilState} from 'recoil';

import WalletDropdown from './WalletDropdown';
import NavDrawer from '../components/drawer/NavDrawer';
import {menuDrawerState} from '../atoms/menu';

const Navbar = () => {
  const location = useLocation();
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const setIsShowMenuDrawer = useSetRecoilState(menuDrawerState);
  const NAV_MENU = [
    {
      title: 'Node',
      link: '/node',
    },
    {
      title: 'Stake',
      link: '/stake',
    },
    {
      title: '$GP',
      link: '/gp',
    },
    {
      title: 'Squad',
      link: '/squad',
      className:
        'squad-linear-gradient rounded-lg border border-[#FFFFFF1F] px-2.5 py-[3px] text-[#FFFFFF14]',
    },
    {
      title: 'Docs',
      link: 'https://gpgpu.gitbook.io/gpgpu',
      icon: '/docs.svg',
    },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full bg-[${location.pathname === '/squad' ? '#FFFFFF03' : '#010101'}] py-2 pe-2 ps-4 backdrop-blur-sm lg:py-3`}>
      <div className="mx-auto flex max-w-[1200px] justify-between">
        {/* mobile NavBar */}
        <div className="flex w-full items-center justify-between lg:hidden">
          <Link to="/node">
            <img width={25.37} height={24} alt="logo" src="/logo.svg" />
          </Link>

          <div className="relative flex items-center gap-2">
            <WalletDropdown
              type="mobile"
              isShowDropdown={isShowDropdown}
              setIsShowDropdown={setIsShowDropdown}
            />

            <button onClick={() => setIsShowMenuDrawer(true)}>
              <img width={40} height={40} alt="list icon" src="/list.svg" />
            </button>
          </div>
        </div>

        {/* PC NavBar */}
        <Link to="/node" className="hidden items-center gap-2 lg:flex">
          <img width={25.37} height={24} alt="logo" src="/logo.svg" />

          <img width={77.11} height={16.8} alt="" src="/gpgpu.svg" />
        </Link>
        <ul className="hidden items-center gap-10 lg:flex">
          {NAV_MENU.map((menu) => (
            <li
              key={menu.title}
              className="flex items-center gap-[2px] text-[#E5E5E5]">
              <Link
                key={menu.title}
                to={menu.link}
                className={menu.className}
                target={`${menu.title === 'Docs' ? '_blank' : '_self'}`}>
                {menu.title}
              </Link>
              {menu.icon && (
                <img
                  height={16}
                  width={16}
                  alt={menu.title + ' icon'}
                  src={menu.icon}
                />
              )}
            </li>
          ))}
        </ul>

        <WalletDropdown
          type="pc"
          isShowDropdown={isShowDropdown}
          setIsShowDropdown={setIsShowDropdown}
        />

        {/* Mobile Drawer */}
        <NavDrawer />
      </div>
    </nav>
  );
};

export default Navbar;
