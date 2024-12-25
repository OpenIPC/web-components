import type { PlayerProps } from './video-player-types';
import { useState, useEffect } from 'preact/hooks';
import useStream from './useStream';

const OIPCVideoPlayer = ({ stream, server, mode, live }: PlayerProps) => {
  const [ paused, setPaused ] = useState(true);
  const [ muted, setMuted ] = useState(true);
  const [ fulled, setFulled ] = useState(false); 
  const [ finite, setFinite ] = useState(false);

  const [ onConnect ] = useStream({ stream, server, mode });

  useEffect(() => {
    onConnect();
  }, []);

  const timeStamp = '1:35:12 / 2:44:58';

  const handlePlayBtnClick = () => {
    setPaused(!paused);
  }

  return (
    <div className="w-full relative group aspect-video bg-black overflow-hidden">
      <figure className="w-full aspect-video">
        <video className="w-full aspect-video">
        </video>
      </figure>
      <div className="w-full px-2 bg-[#9e9e9e40] absolute bottom-[-56px] flex flex-col transition-bottom duration-300 ease-linear group-hover:bottom-0">
        { !live &&
          <div className="bg-white h-2 w-full mt-2">
            <div className="h-full w-10 bg-[#283593]">
            </div>
          </div>
        }
        <div className="flex flex-row items-center py-1">
          <div className="w-min cursor-pointer" onClick={handlePlayBtnClick}>
            {
              paused
                ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill="#fff"><path d="M8,5.14V19.14L19,12.14L8,5.14Z"/></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill="#fff"><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>
            }
          </div>
          {
            live &&
              <div>
                <span className="font-bold pl-1 text-white align-middle">LIVE</span>
              </div>
          }
          <div className="ml-auto flex flex-row gap-x-2">
            <div className="text-white text-sm">
              <span className="align-middle">{timeStamp}</span>
            </div>
            <div className="w-min flex flex-row items-center gap-x-[2px]">
              {
                muted
                  ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill="#fff"><path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" /></svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill="#fff"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" /></svg>
              }
              <div className="h-1 bg-white w-[60px]">
                <div className="h-full w-10 bg-[#283593]">
                </div>
              </div>
            </div>
            <div className="w-min">
              {
                fulled
                  ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill="#fff"><path d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z" /></svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill="#fff"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" /></svg>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OIPCVideoPlayer;
