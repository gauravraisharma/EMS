export type RequestParamsType = QueryParams | URLSearchParams;
export type RequestPayloadDataType = FormData;

export interface QueryParams {
  [param: string]: string | boolean | number | null;
}
