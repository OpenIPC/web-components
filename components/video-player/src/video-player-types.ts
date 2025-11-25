export type PlayerProps = {
  stream: string
  server: string
  live?: boolean
}

export type Msg = {
  type: string
  value: string
}

export type Mode = 'webrtc' | 'mse' | 'hls' | 'mjpeg';
