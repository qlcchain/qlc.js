import { paramsMissing, paramsFormat } from "../common/error";
import { Address } from "../common/type";

export function checkParams(params, requiredP:Array<string> = [], validFunc:Array<{ name, func, msg? }> =[]) {
    if (!params) {
        return null;
    }

    let isHave = (name) => {
        return params.hasOwnProperty(name) && 
            typeof params[name] !== 'undefined' &&
            params[name] !== null
    }

    for (let i=0; i<requiredP.length; i++) {
        let name = requiredP[i];
        if ( !isHave(name) ) {
            return {
                code: paramsMissing.code,
                message: `${paramsMissing.message} ${name}.`
            }
        }
    }

    for (let i=0; i<validFunc.length; i++) {
        let { name, func, msg } = validFunc[i];
        if (!name || !func || !isHave(name)) {
            continue;
        }

        if ( !func(params[name]) ) {
            return {
                code: paramsFormat.code,
                message: `${paramsFormat.message} Illegal ${name}. ${msg || ''}`
            }
        }
    }

    return null;
}

export function isValidHexAddr(hexAddr: Address): boolean {
  return true;
}