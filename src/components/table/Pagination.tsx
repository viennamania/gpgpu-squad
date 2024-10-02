import {Dispatch, SetStateAction} from 'react';
import CaretLeft from '../CaretLeft';
import CaretRight from '../CaretRight';

interface PaginationPropsType {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  className?: string;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  className,
}: PaginationPropsType) => {

  const range = (start: number, end: number) => {
    return Array.from({length: end - start + 1}, (_, idx) => start + idx);
  };

  const visiblePagesMobile = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);

    if (currentPage <= 3) {
      end = Math.min(totalPages, 5);
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }

    return range(start, end);
  };

  const visiblePages = () => {
    let start = Math.max(1, currentPage - 4);
    let end = Math.min(totalPages, start + 9);

    if (currentPage <= 5) {
      end = Math.min(totalPages, 10);
    } else if (currentPage >= totalPages - 4) {
      start = Math.max(1, totalPages - 9);
    }

    return range(start, end);
  };
  

  return (
    <div className={'flex justify-center ' + className}>
      <button
        className="mr-6"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}>
        <CaretLeft fillColor="#898F99" />
      </button>
      <div className="hidden gap-6 text-sm font-medium leading-[16.8px] lg:flex">
        {visiblePages().map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`${currentPage === num ? 'text-white' : 'text-[#737780]'} w-[9px]`}>
            {num}
          </button>
        ))}
        {currentPage <= totalPages - 5 && totalPages > 10 && (
          <>
            <img src="/ellipsis.svg" alt="ellipsis icon" />
            <button
              className={`${currentPage === totalPages ? 'text-white' : 'text-[#737780]'}`}
              onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </button>
          </>
        )}
      </div>
      <div className="flex: flex gap-6 text-sm font-medium leading-[16.8px] lg:hidden">
        {visiblePagesMobile().map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`${currentPage === num ? 'text-white' : 'text-[#737780]'} w-[9px]`}>
            {num}
          </button>
        ))}
        {currentPage <= totalPages - 3 && totalPages > 5 && (
          <>
            <img src="/ellipsis.svg" alt="ellipsis icon" />
            <button
              className={`${currentPage === totalPages ? 'text-white' : 'text-[#737780]'}`}
              onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </button>
          </>
        )}
      </div>
      <button
        className="ml-6"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}>
        <CaretRight fillColor="#898F99" />
      </button>
    </div>
  );
};

export default Pagination;
