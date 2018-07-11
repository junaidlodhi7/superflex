/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare module 'quill';
declare module 'leaflet';
declare module 'perfect-scrollbar';
declare module 'screenfull';
declare module 'd3-shape';

declare function HighchartsModule(H: any): any;

declare module 'highcharts/highcharts-more.src' {
    export default HighchartsModule;
}

declare module 'highcharts/modules/xrange.src' {
    export default HighchartsModule;
}
