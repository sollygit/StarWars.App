export interface RequestConfigModel {
  url: string;
  method: string;
  body?: any;
  headers: {
    [index: string]: string;
  };
}
