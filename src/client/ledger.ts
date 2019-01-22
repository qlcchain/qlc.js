import { ledger as _ledger } from 'common/method';
import { RPCresponse, RPCrequest, Address } from 'common/type';
import { checkParams, isValidHexAddr } from 'utils/tools';
import Client from '.';

export default class Ledger {
    _client: Client;

    constructor(client) {
        this._client = client;
    }

    async getBalance(addr: Address) {
        let err = checkParams(
            { addr },
            ['addr'],
            [
                {
                    name: 'addr',
                    func: isValidHexAddr
                }
            ]
        );
        if (err) {
            return Promise.reject(err);
        }

        const data: RPCresponse[] = await this._client.batch([
            {
                methodName: _ledger.process,
                params: [addr]
            }
        ]);

        if (!data || +data.length < 2) {
            return null;
        }

        return {
            balance: data[0].result,
            onroad: data[1].result
        };
    }
}
