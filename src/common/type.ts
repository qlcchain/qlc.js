import methods from "common/method";
export declare type Hash = string
export declare type Address = string
export declare type Int64 = number
export declare type Uint64 = string
export declare type BigInt = string

export type Methods = methods;

export declare interface RPCrequest {
    type?: string;
    methodName: methods;
    params: any[];
}

export declare interface RPCresponse {
    jsonrpc?: string;
    id?: number;
    result?: any;
    error?: RPCerror
}

export declare interface RPCerror {
    code: number,
    message: string
}

export enum BlockType {
  State = 0,
  SmartContract
}

export declare type StateBlock = {
  type: BlockType
  address: Address
  token: Hash
  balance: BigInt
  link: Hash
  representative: Address
  previous: Hash
  extra: Hash
  work: string
  signature: string
}
