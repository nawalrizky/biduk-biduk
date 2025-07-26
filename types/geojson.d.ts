declare module "*.geojson" {
  interface GeoJSONProperties {
    GID_0?: string;
    GID_1?: string;
    GID_2?: string;
    GID_3?: string;
    GID_4?: string;
    NAME_0?: string;
    NAME_1?: string;
    NAME_2?: string;
    NAME_3?: string;
    NAME_4?: string;
    TYPE_4?: string;
    ENGTYPE_4?: string;
    VARNAME_4?: string;
    COUNTRY?: string;
    CC_4?: string;
    [key: string]: string | number | boolean | null | undefined;
  }
  
  interface GeoJSONFeature {
    type: string;
    properties: GeoJSONProperties;
    geometry: {
      type: string;
      coordinates: number[] | number[][] | number[][][] | number[][][][];
    };
  }
  
  interface GeoJSONFeatureCollection {
    type: string;
    features: GeoJSONFeature[];
  }
  
  const value: GeoJSONFeatureCollection;
  export default value;
}
