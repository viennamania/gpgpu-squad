import {useEffect, useRef} from 'react';

const useTierList = () => {
  const tiersContainerRef = useRef<HTMLDivElement | null>(null);
  const tiersListRef = useRef<HTMLUListElement | null>(null);
  const scrollBackwardRef = useRef<HTMLDivElement | null>(null);
  const scrollForwardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWindowResize = (): void => {
      if (
        !tiersContainerRef.current ||
        !tiersListRef.current ||
        !scrollBackwardRef.current ||
        !scrollForwardRef.current
      )
        return;

      const containerLeft =
        tiersContainerRef.current.getBoundingClientRect().left;
      const tiersListLeft = new WebKitCSSMatrix(
        tiersListRef.current.style.transform,
      ).m41;
      const tiersContainerWidth = document.body.clientWidth - containerLeft * 2;
      tiersContainerRef.current.style.width = `${tiersContainerWidth}px`;

      const tiersListWidth = tiersListRef.current.offsetWidth;
      const tiersListHeight = tiersListRef.current.offsetHeight;
      tiersContainerRef.current.style.height = `${tiersListHeight}px`;

      const hasOverflow =
        tiersListRef.current.scrollWidth > tiersContainerWidth;

      if (!hasOverflow) {
        scrollBackwardRef.current.style.display = 'none';
        scrollForwardRef.current.style.display = 'none';
      }

      if (!tiersListLeft) return;
      const shouldTranslate =
        tiersListWidth - tiersContainerWidth - tiersListLeft < 0;
      if (shouldTranslate) {
        tiersListRef.current.style.transform = `translateX(${(tiersListWidth - tiersContainerWidth) * -1}px)`;
      } else {
        scrollForwardRef.current.style.display = 'inline-flex';
      }
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseOrTouchDown = (evt: Event) => {
      let startX = 0;
      const left = new WebKitCSSMatrix(tiersListRef.current!.style.transform)
        .m41;
      startX =
        evt instanceof MouseEvent
          ? evt.clientX
          : (evt as TouchEvent).touches[0].clientX;

      const tiersContainerWidth = parseInt(
        tiersContainerRef.current!.style.width,
        10,
      );
      const tiersListWidth = tiersListRef.current!.offsetWidth;

      const handleMouseOrTouchMove = (evt: Event) => {
        evt.preventDefault();
        evt.stopPropagation();
        const clientX =
          evt instanceof MouseEvent
            ? evt.clientX
            : (evt as TouchEvent).touches[0].clientX;
        const distance = startX - clientX - left;

        if (distance > 0 && distance < tiersListWidth - tiersContainerWidth) {
          scrollBackwardRef.current!.style.display =
            distance > 20 ? 'inline-flex' : 'none';
          scrollForwardRef.current!.style.display =
            distance < tiersListWidth - tiersContainerWidth - 20
              ? 'inline-flex'
              : 'none';
          tiersListRef.current!.style.transform = `translateX(${-distance}px)`;
        } else if (distance <= 0) {
          scrollBackwardRef.current!.style.display = 'none';
          tiersListRef.current!.style.transform = 'translateX(0px)';
        } else if (distance >= tiersListWidth - tiersContainerWidth) {
          scrollForwardRef.current!.style.display = 'none';
          tiersListRef.current!.style.transform = `translateX(${(tiersListWidth - tiersContainerWidth) * -1}px)`;
        }
      };

      const handleMouseOrTouchUp = () => {
        document.removeEventListener('mousemove', handleMouseOrTouchMove, true);
        document.removeEventListener('touchmove', handleMouseOrTouchMove, true);
      };

      document.addEventListener('mousemove', handleMouseOrTouchMove, {
        capture: true,
      });
      document.addEventListener('touchmove', handleMouseOrTouchMove, {
        capture: true,
        passive: false,
      });
      document.addEventListener('mouseup', handleMouseOrTouchUp, {once: true});
      document.addEventListener('touchend', handleMouseOrTouchUp, {once: true});
    };

    const tiersListElem = tiersListRef.current!;
    tiersListElem.addEventListener('mousedown', handleMouseOrTouchDown, true);
    tiersListElem.addEventListener('touchstart', handleMouseOrTouchDown, {
      capture: true,
      passive: true,
    });

    return () => {
      tiersListElem.removeEventListener(
        'mousedown',
        handleMouseOrTouchDown,
        true,
      );
      tiersListElem.removeEventListener('touchstart', handleMouseOrTouchDown, {
        capture: true,
      });
    };
  }, []);

  return {
    tiersContainerRef,
    tiersListRef,
    scrollBackwardRef,
    scrollForwardRef,
  };
};

export default useTierList;
