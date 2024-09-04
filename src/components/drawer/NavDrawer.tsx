import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import CaretRight from '../CaretRight';
import {useRecoilState} from 'recoil';
import {menuDrawerState} from '../../atoms/menu';

const NavDrawer = () => {
  const [isShowMenuDrawer, setIsShowMenuDrawer] =
    useRecoilState(menuDrawerState);

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
    },
    {
      title: 'Documentation',
      link: 'https://gpgpu.gitbook.io/gpgpu',
      icon: '/docs.svg',
    },
  ];

  useEffect(() => {
    if (isShowMenuDrawer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isShowMenuDrawer]);

  

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-screen w-full flex-col overflow-y-auto transition-transform lg:hidden ${isShowMenuDrawer ? 'translate-x-0' : 'translate-x-full'} `}>
      <div className="flex h-[56px] items-center justify-between bg-[#010101] p-4">
        <img width={25.37} height={24} alt="logo" src="/logo.svg" />
        <button onClick={() => setIsShowMenuDrawer(false)}>
          <img width={20} height={20} alt="close icon" src="/close.svg" />
        </button>
      </div>

      <ul className="flex flex-1 flex-col justify-center bg-[#000000B2]">
        {NAV_MENU.map((menu, index, arr) => (
          <Link
            key={menu.title}
            to={menu.link}
            onClick={() => setIsShowMenuDrawer(false)}
            target={`${menu.title === 'Documentation' ? '_blank' : '_self'}`}
            className={`mx-4 flex items-center justify-between border-[#FFFFFF1A] pe-4 ${arr.length - 1 !== index && 'border-b'}`}>
            <div className="text-linear-gradient flex items-center gap-1 py-5 text-[30px] leading-[36.31px] -tracking-[1px]">
              <span>{menu.title}</span>
              {menu.icon && (
                <img
                  height={24}
                  width={24}
                  alt={menu.title + ' icon'}
                  src={menu.icon}
                />
              )}
            </div>

            <CaretRight width="16" height="16" />
          </Link>
        ))}
      </ul>

      <div className="mx-4 flex items-center justify-between border-t border-[#FFFFFF1A] bg-[#000000B2] py-5">
        <div className="flex items-center gap-2">
          <button>
            <img
              src="/telegram_circle.svg"
              alt="telegram_circle icon"
              width={32}
              height={32}
            />
          </button>
          <button>
            <img
              src="/twitter_circle.svg"
              alt="twitter_circle icon"
              width={32}
              height={32}
            />
          </button>
          <button>
            <img
              src="/discord_circle.svg"
              alt="discord_circle icon"
              width={32}
              height={32}
            />
          </button>
        </div>

        <p className="text-sm leading-[16.94px] text-[#FFFFFF]">Contact</p>
      </div>
    </div>
  );
};


export default NavDrawer;
