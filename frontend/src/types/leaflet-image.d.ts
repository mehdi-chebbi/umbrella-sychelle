declare module 'leaflet-image' {
  import L from 'leaflet';
  function leafletImage(
    map: L.Map,
    callback: (err: Error | null, canvas: HTMLCanvasElement) => void,
  ): void;
  export default leafletImage;
}