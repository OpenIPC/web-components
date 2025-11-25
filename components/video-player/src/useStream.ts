import {RefObject} from 'preact';
import type { Mode, Msg } from './video-player-types';
import { useState } from 'preact/hooks';

const CODECS = [
  'avc1.640029',      // H.264 high 4.1 (Chromecast 1st and 2nd Gen)
  'avc1.64002A',      // H.264 high 4.2 (Chromecast 3rd Gen)
  'avc1.640033',      // H.264 high 5.1 (Chromecast with Google TV)
  'hvc1.1.6.L153.B0', // H.265 main 5.1 (Chromecast Ultra)
  'mp4a.40.2',        // AAC LC
  'mp4a.40.5',        // AAC HE
  'flac',             // FLAC (PCM compatible)
  'opus',             // OPUS Chrome, Firefox
] as const;
const mode = 'webrtc,mse,hls,mjpeg';
const media = 'video,audio';

const useStream = (stream: string, server: string, videoRef: RefObject<HTMLVideoElement>) => {
  const wsURL = `ws://${server}:1984/api/ws?src=${stream}`;
  let ws: WebSocket | null = null;
  let wsState: number = WebSocket.CLOSED; 
  // WebSocket Time Stamp
  let wsTS = 0;
  let onmessage = <Record<Mode, (msg: Msg) => void>>{};
  let ondata: ((data: ArrayBuffer) => void) | null = null;
  let mseCodecs = '';

  const [ paused, setPaused ] = useState(true);

  const connect = () => {
    videoRef.current!.addEventListener('pause', () => setPaused(true));
    videoRef.current!.addEventListener('play', () => setPaused(false));
    wsState = WebSocket.CONNECTING;
    wsTS = Date.now();
    ws = new WebSocket(wsURL);
    ws.binaryType = 'arraybuffer';
    ws.addEventListener('open', onopen);
    ws.addEventListener('close', () => console.log('ws close'));

    return true;
  }

  const onopen = () => {
    console.log('On open');
    if (!ws) return;
    wsState = WebSocket.OPEN;
    ws.addEventListener('message', ev => {
      if (typeof ev.data === 'string') {
        const msg: Msg = JSON.parse(ev.data);
        for (const mode of Object.keys(onmessage)) {
          onmessage[mode as Mode](msg);
        }
      } else {
        ondata && ondata(ev.data);
      }
    });
    
    ondata = null;
    const modes: Mode[] = [];

    if (mode.includes('mse') && ('MediaSource' in window || 'ManagedMediaSource' in window)) {
      modes.push('mse');
      onmse();
    }

    return modes;
  }

  const onmse = () => {
    let ms = new MediaSource();
    ms.addEventListener('sourceopen', () => {
      URL.revokeObjectURL(videoRef.current!.src);
      send({ type: 'mse', value: codecs(MediaSource.isTypeSupported) });
    }, { once: true });

    videoRef.current!.src = URL.createObjectURL(ms);
    videoRef.current!.srcObject = null;

    play();

    mseCodecs = '';

    onmessage['mse'] = msg => {
      if (msg.type !== 'mse') return;

      mseCodecs = msg.value;

      const sb = ms.addSourceBuffer(msg.value);
      sb.mode = 'segments';
      sb.addEventListener('updateend', () => {
        if (sb.updating) return;

        try {
          if (bufLen > 0) {
            const data = buf.slice(0, bufLen);
            bufLen = 0;
            sb.appendBuffer(data);
          } else if (sb.buffered && sb.buffered.length) {
            const end = sb.buffered.end(sb.buffered.length - 1) - 15;
            const start = sb.buffered.start(0);
            if (end > start) {
              sb.remove(start, end);
              ms.setLiveSeekableRange(end, end + 15);
            }
          }
        } catch (err) {
          console.warn(err);
        }
      });
      
      const buf = new Uint8Array(2 * 1024 * 1024);
      let bufLen = 0;

      ondata = data => {
        if (sb.updating || bufLen > 0) {
          const b = new Uint8Array(data);
          buf.set(b, bufLen);
          bufLen += b.byteLength;
        } else {
          try {
            sb.appendBuffer(data);
          } catch (err) {
            console.warn(err);
          }
        }
      }
    }
  }

  const play = () => {
    videoRef.current!.play().catch(() => {
      if (!videoRef.current!.muted) {
        videoRef.current!.muted = true;
        videoRef.current!.play().catch(err => {
          console.warn(err);
        })
      }
    })
  }

  const pause = () => {
    if (!videoRef.current!.paused) {
      videoRef.current!.pause();
    }
  }

  // msg to server via WebSocket
  const send = (value: { type: string, value: string }) => {
    if (ws) ws.send(JSON.stringify(value));
  }

  const codecs = (isSupported: (val: string) => boolean) => {
    return CODECS
      .filter(codec => media.includes(codec.includes('vc1') ? 'video' : 'audio'))
      .filter(codec => isSupported(`video/mp4; codecs="${codec}"`)).join();
  };

  return [ connect, play, pause, paused ];
}

export default useStream;
