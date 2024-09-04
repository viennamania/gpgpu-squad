import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#323233] px-4 py-6">
      <div className="mx-auto flex max-w-[1200px] justify-between">
        {/* 로고 */}
        <Link to="/node">
          <img width={25.37} height={24} alt="logo" src="/logo.svg" />
        </Link>

        {/* 카피 라이터 */}
        <p className="text-xs text-[#5E6166]">© Copyright by gpgpu.ai, inc.</p>

        {/* SNS */}
        <div className="flex items-center gap-[23px]">
          <Link to="#">
            <img
              width={20}
              height={20}
              alt="telegram icon"
              src="/telegram.svg"
            />
          </Link>
          <Link to="#">
            <img
              width={20}
              height={20}
              alt="telegram icon"
              src="/twitter.svg"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
