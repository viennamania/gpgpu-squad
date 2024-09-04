import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import SquadListTable from '../table/SquadListTable';

interface SecondStepPropsType {
  setStep: Dispatch<SetStateAction<number>>;
  setIsJoined: Dispatch<SetStateAction<boolean>>;
}

const SecondStep = ({setStep, setIsJoined}: SecondStepPropsType) => {
  const [selectedSquadType, setSelectedSquadType] = useState<
    'leader' | 'member'
  >('leader');
  const [squadName, setSquadName] = useState('');
  const [applyState, setApplyState] = useState<'valid' | 'invalid' | 'default'>(
    'default',
  );

  const handleApply = () => {
    const result = true; // 유효하지 않을 경우 false
    if (result) {
      setApplyState('valid');
    } else {
      setSquadName('');
      setApplyState('invalid');
    }
  };

  const handleNextStep = () => {
    setIsJoined(true);
  };

  useEffect(() => {
    setApplyState('default');
  }, [squadName, selectedSquadType]);

  return (
    <div className="my-8 w-full">
      <button
        onClick={() => setStep(0)}
        className="mb-[30px] flex items-center gap-1.5">
        <img
          src="/chevron_left.svg"
          width={16}
          height={16}
          alt="chevron left"
        />
        <span className="text-[16px] leading-[22.4px] text-[#999EA7]">
          Back to main
        </span>
      </button>

      <div className="flex w-full flex-col justify-between gap-10 lg:flex-row">
        {/* Description */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#FFFFFF] bg-[#2B2B2B] text-center text-[12px] leading-[26px] text-[#999EA7]">
              <img src="/step_checked.svg" width={9.5} height={6.33} />
            </div>
            <div className="h-[1px] w-[10px] bg-[#FFFFFF1A]"></div>
            <div className="h-[26px] w-[26px] rounded-full border border-[#FFFFFF14] bg-white text-center text-[12px] leading-[26px] text-[#010101]">
              2
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[32px] font-medium leading-[38.4px] text-[#FFFFFF]">
              Squad choice
            </p>
            <p className="text-[14px] leading-[19.6px] text-[#8E9199]">
              Create a new squad and act as a leader or participate as
              <br />a member within an already made squad
            </p>
          </div>
          <button
            onClick={handleNextStep}
            disabled={applyState !== 'valid'}
            className={`self-start rounded-[100px] px-6 py-[10px] text-[16px] leading-[20.8px] ${applyState !== 'valid' ? 'border border-[#4A4B4D] text-[#999EA7]' : 'bg-[#ffffff] text-[#010101]'} `}>
            Start Squad
          </button>
        </div>

        {/* Squad Type */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 lg:flex-row">
            <button
              className="flex-1"
              onClick={() => setSelectedSquadType('leader')}>
              <div
                className={`flex w-full items-start justify-between rounded-xl border p-6 border-[${selectedSquadType === 'leader' ? '#E5E5E5' : '#40444B'}] bg-[#0101011A]`}>
                <div className="flex flex-col gap-2">
                  <div className="self-start rounded-md bg-[#292929] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                    Leader
                  </div>
                  <p className="text-linear text-[16px] font-medium leading-[22.4px]">
                    Create New Squad
                  </p>
                </div>

                <img
                  src={`${selectedSquadType === 'leader' ? '/radio_selected.svg' : '/radio.svg'}`}
                  width={24}
                  height={24}
                  alt="radio svg"
                />
              </div>
            </button>
            <button
              className="flex-1"
              onClick={() => setSelectedSquadType('member')}>
              <div
                className={`flex items-start justify-between rounded-xl border p-6 border-[${selectedSquadType === 'member' ? '#E5E5E5' : '#40444B'}] bg-[#0101011A]`}>
                <div className="flex flex-col gap-2">
                  <div className="self-start rounded-md bg-[#292929] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                    Member
                  </div>
                  <p className="text-linear text-[16px] font-medium leading-[22.4px]">
                    Join Squad
                  </p>
                </div>

                <img
                  src={`${selectedSquadType === 'member' ? '/radio_selected.svg' : '/radio.svg'}`}
                  width={24}
                  height={24}
                  alt="radio svg"
                />
              </div>
            </button>
          </div>

          {selectedSquadType === 'leader' ? (
            <div className="flex flex-col gap-4 rounded-xl border border-[#40444B] p-6 lg:w-[700px]">
              <p className="text-linear text-[20px] font-medium leading-[28px]">
                Name Check
              </p>

              <div className="flex flex-row items-center justify-between gap-2 border-[#40444B] bg-[#0101011A] lg:flex-row">
                <div className="flex flex-1 flex-col">
                  <input
                    value={squadName}
                    onChange={(e) => setSquadName(e.target.value)}
                    className="w-full bg-transparent text-[24px] font-medium leading-[28.8px] placeholder-[#5B5E66] outline-none"
                    placeholder="Squad Name"></input>

                  {applyState !== 'default' &&
                    (applyState === 'valid' ? (
                      <span className="text-sm leading-[16.8px] text-[#03C397]">
                        you can use it
                      </span>
                    ) : (
                      <span className="text-sm leading-[16.8px] text-[#F26464]">
                        not available
                      </span>
                    ))}
                </div>
                <button
                  onClick={handleApply}
                  disabled={!squadName}
                  className={`rounded-[100px] border border-[#4A4B4D] px-6 py-[9.5px] leading-[20.8px] ${!squadName ? 'text-[#5F6166]' : 'text-[#FFFFFF]'} `}>
                  Apply
                </button>
              </div>
            </div>
          ) : (
            <SquadListTable setApplyState={setApplyState} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
