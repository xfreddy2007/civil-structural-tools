/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect ,useRef } from 'react';
import { css, cx } from '@emotion/css';
import { md, xl } from '@/libs/utils/break-points';
import NavigationTab from './NavigationTab';
import NavigationList from './NavigationList';

const rootStyle = css`
  height: 40px;
  .nav-icon {
    font-family: 'Noto Sans', sans-serif;
    left: 50%;
    transform: translateX(-50%);
  }
  .hambar__top, .hambar__middle, .hambar__bottom {
    transition: all .4s;
  }
  .change .hambar__top {
    transform: rotate(-45deg) translate(-5px, 8px);
    -webkit-transform: rotate(-45deg) translate(-5px, 8px);
  }
  .change .hambar__middle {
    opacity: 0;
  }
  .change .hambar__bottom {
    transform: rotate(45deg) translate(-2px, -6px);
    -webkit-transform: rotate(45deg) translate(-2px, -6px);
  }
  ${md} {
    height: 50px;
  }
  ${xl} {
    .nav-icon {
      left: unset;
      transform: unset;
    }
  }
`;

const NavigationBar: React.FC = () => {
  const [tab, setTab] = useState(0);
  // handle subMenu open state
  const [open, setOpen] = useState(0);
  // control hamburger bar animation
  const [hambarOpen, setHambarOpen] = useState(false);
  const hamBarRef = useRef<HTMLDivElement>(null);
  // handle close subMenu outside subMenu area on mobile and tablet device
  const navModalRef = useRef<HTMLDivElement>(null);
  const hambarHandler = () => {
    if (hambarOpen) {
      setHambarOpen(false);
      setOpen(0);
      setTab(0);
    } else {
      setHambarOpen(true);
      setTab(0);
    }
  };
  useEffect(() => {
    if (hambarOpen) {
      hamBarRef.current?.classList.add('change');
      navModalRef.current?.classList.remove('hidden');
    } else {
      hamBarRef.current?.classList.remove('change');
      navModalRef.current?.classList.add('hidden');
    }
  }, [hambarOpen, tab]);
  //  close subMenu modal handler
  const subMenuModalHandler = () => {
    if (hambarOpen) {
      setHambarOpen(false);
    }
  };


  return (
    <>
      <header className="w-full fixed top-0 left-0 z-50" onMouseLeave={() => setTab(0)}>
        <nav className={cx('w-full bg-green-900 flex text-white items-center', rootStyle)}>
          <div className="nav-icon font-bold flex items-center px-4 absolute xl:relative">
            <a href="/">
              {"Freddy Tools"}
            </a>
          </div>
          <div className="xl:hidden space-y-1 ml-4" onClick={hambarHandler} ref={hamBarRef}>
            <div className="hambar__top h-1 bg-white w-8" />
            <div className="hambar__middle h-1 bg-white w-8" />
            <div className="hambar__bottom h-1 bg-white w-8" />
          </div>
          <div id="desktop-nav-tab" className="hidden xl:flex h-full">
            <NavigationTab
              text="RC"
              onClick={() => setTab(1)}
              onMouseOver={() => setTab(1)}
            />
            <NavigationTab
              text="鋼結構設計"
              onClick={() => setTab(2)}
              onMouseOver={() => setTab(2)}
            />
            <NavigationTab
              text="地震力設計"
              onClick={() => setTab(3)}
              onMouseOver={() => setTab(3)}
            />
          </div>
        </nav>
        <NavigationList
          desktopClassName={tab === 0 ? 'hidden' : 'hidden xl:flex'}
          mobileClassName={hambarOpen ? 'flex xl:hidden' : 'hidden'}
          tab={tab}
          setTab={setTab}
          open={open}
          setOpen={setOpen}
        />
      </header>
      <div className="w-screen h-screen fixed bg-transparent z-10" ref={navModalRef} onClick={subMenuModalHandler}/>
    </>
  );
};

export default React.memo(NavigationBar);
