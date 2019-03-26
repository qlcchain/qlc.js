import { ledger as _ledger } from '../common/method';
import { account as _account } from '../common/method';
import { RPCresponse, RPCrequest, Address } from '../common/type';
import { checkParams, isValidHexAddr } from '../utils/tools';
import { BigNumber } from 'bignumber.js';
import Client from '.';

export default class Ledger {
    _client: Client;

    zeroHash = '0000000000000000000000000000000000000000000000000000000000000000';

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

    async generateSendBlock(sendBlock) {
        const accountFrom = await this._client.request(_ledger.accountInfo,sendBlock.from);
        const tokens = accountFrom.result.tokens;
        const token = await this._client.request(_ledger.tokenInfoByName,sendBlock.tokenName);
		const fromTokens = Array.isArray(tokens) ? tokens.filter(tokenMeta => tokenMeta.type === token.result.tokenId)[0] : null;
        const link = await this._client.request(_account.accountPublicKey,sendBlock.to);
        const remainingDecimal = new BigNumber(fromTokens.balance).minus(sendBlock.amount).toString(10);
        const blockData = {
			type: 'Send',
			token: token.result.tokenId,
			address: sendBlock.from,
			balance: remainingDecimal,
			previous: fromTokens.header,
            link: link.result,
            //sender: '',
            //receiver: '',
            message: this.zeroHash,
            quota: 0,
            timestamp: Math.floor(new Date().getTime()/1000),
			extra: this.zeroHash,
			representative: accountFrom.result.representative
        };
        return blockData;
    }

    async getAccountInfo(account) {
        try {
            return await this._client.request(_ledger.accountInfo,account);
        } catch(e) {
            return e;
        }
    }

    async generateReceiveBlock(sendBlock) {
        const accountToFromPublicKey = await this._client.request(_account.accountForPublicKey,sendBlock.link);
        let remainingDecimal = '0';
        let type = 'Receive';
        let previous = this.zeroHash;
        const accountTo = await this.getAccountInfo(accountToFromPublicKey.result);
        let representative = sendBlock.representative;
        if (accountTo.result) {
            const tokens = accountTo.result.tokens;
            const fromTokens = Array.isArray(tokens) ? tokens.filter(tokenMeta => tokenMeta.type === sendBlock.token)[0] : null;
            remainingDecimal = new BigNumber(fromTokens.balance).plus(sendBlock.amount).toString(10);
            previous = fromTokens.header;
            representative = fromTokens.representative;
        } else {
            type = 'Open';
            remainingDecimal = new BigNumber(0).plus(sendBlock.amount).toString(10);
        }
        const blockData = {
			type: type,
			token: sendBlock.token,
			address: accountToFromPublicKey.result,
			balance: remainingDecimal,
			previous: previous,
            link: sendBlock.hash,
            //sender: '',
            //receiver: '',
            message: this.zeroHash,
            quota: 0,
            timestamp: Math.floor(new Date().getTime()/1000),
			extra: this.zeroHash,
			representative: representative
        };
        return blockData;
    }

    async generateChangeBlock(account,representative) {
        const accountChanging = await this._client.request(_ledger.accountInfo,account);
        const changingTokens = accountChanging.result.tokens;
        const token = await this._client.request(_ledger.tokenInfoByName,'QLC');
        const changingToken = Array.isArray(changingTokens) ? changingTokens.filter(tokenMeta => tokenMeta.type === token.result.tokenId)[0] : null;
        const balanceDecimal = new BigNumber(changingToken.balance).toString(10);
        const blockData = {
			type: 'Change',
			token: token.result.tokenId,
			address: account,
			balance: balanceDecimal,
			previous: changingToken.header,
            link: this.zeroHash,
            //sender: '',
            //receiver: '',
            message: this.zeroHash,
            quota: 0,
            timestamp: Math.floor(new Date().getTime()/1000),
			extra: this.zeroHash,
			representative: representative
        };
        return blockData;
    }
}
