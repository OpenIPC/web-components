export type PlayerProps = {
  stream: string,
  server: string
  live?: boolean
}

export type Mode = 'webrtc' | 'mse' | 'hls' | 'mjpeg';
