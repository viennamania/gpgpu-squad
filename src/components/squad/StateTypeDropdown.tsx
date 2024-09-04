import {Dispatch, SetStateAction} from 'react';

interface StateTypeDropdownPropsType {
  isShowDropdown: boolean;
  setIsShowDropdown: Dispatch<SetStateAction<boolean>>;
  stateType: string;
  setStateType: Dispatch<SetStateAction<string>>;
}

const StateTypeDropdown = ({
  isShowDropdown,
  setIsShowDropdown,
  stateType,
  setStateType,
}: StateTypeDropdownPropsType) => {
  const handleClick = (type: string) => {
    setStateType(type);
    setIsShowDropdown(false);
  };
  return (
    <div className={`relative z-40`}>
      <button
        onClick={() => setIsShowDropdown((prev) => !prev)}
        className="flex h-[42px] w-full items-center justify-between rounded-lg border border-[#1E1E1F] bg-[#0101011A] px-4 py-[5px]">
        <span className="text-[14px] font-medium leading-[19.6px] text-[#E5E5E5]">
          {stateType}
        </span>
        <img
          src="/chevron_down.svg"
          alt="chevron down"
          className={isShowDropdown ? 'rotate-180' : ''}
        />
      </button>
      {isShowDropdown && (
        <ul className="absolute right-0 top-12 w-full bg-[#010101]">
          {['All', 'Attack', 'Damage', 'Purchase', 'Join'].map((type) => (
            <li>
              <button
                key={type}
                onClick={() => handleClick(type)}
                className={`w-full px-4 py-2 text-left text-[12px] font-medium leading-[16.8px]`}>
                {type}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StateTypeDropdown;
