import type { PlayerProps } from './video-player-types';

const useStream = ({ stream, server, mode }: PlayerProps) => {
  const wsURL = `ws://${server}:1984/api/ws?src=${stream}`;
  let isConnected = false;
  let ws: WebSocket | null = null;
  let wsState: number = WebSocket.CLOSED; 
  let wsTS = 0;

  const onConnect = () => {
    if (!isConnected) return false;
    
    wsState = WebSocket.CONNECTING;
    wsTS = Date.now();
    ws = new WebSocket(wsURL);
    ws.binaryType = 'arraybuffer';
    ws.addEventListener('open', () => console.log('ws open'));
    ws.addEventListener('close', () => console.log('ws close'));
  }

  return [ onConnect ];
}

export default useStream;
