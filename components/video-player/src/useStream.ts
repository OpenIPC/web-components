import type { PlayerProps } from './video-player-types';

const useStream = ({ stream, server, mode }: PlayerProps) => {
  const wsURL = `ws://${server}:1984/api/ws?src=${stream}`;
  let ws: WebSocket | null = null;
  let wsState: number = WebSocket.CLOSED; 
  // WebSocket Time Stamp
  let wsTS = 0;

  const onConnect = () => {
    wsState = WebSocket.CONNECTING;
    wsTS = Date.now();
    ws = new WebSocket(wsURL);
    ws.binaryType = 'arraybuffer';
    ws.addEventListener('open', () => console.log('ws open'));
    ws.addEventListener('close', () => console.log('ws close'));

    return true;
  }

  return [ onConnect ];
}

export default useStream;
