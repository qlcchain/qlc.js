import { ledger as _ledger } from '../common/method';
import { account as _account } from '../common/method';
import { mintage as _mintage } from '../common/method';
import { sms as _sms } from '../common/method';
import { net as _net } from '../common/method';
import { util as _util } from '../common/method';
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

    // account 
    async accountPublicKey(account) {
        try {
            return await this._client.request(_account.accountPublicKey,account);
        } catch(e) {
            return e;
        }
    }

    async accountForPublicKey(accountPublicKey) {
        try {
            return await this._client.request(_account.accountForPublicKey,accountPublicKey);
        } catch(e) {
            return e;
        }
    }

    async accountValidate(account) {
        try {
            return await this._client.request(_account.accountValidate,account);
        } catch(e) {
            return e;
        }
    }

    // ledger start
    async accountBlocksCount(account) {
        try {
            return await this._client.request(_ledger.accountBlocksCount,account);
        } catch(e) {
            return e;
        }
    }

    async accountHistoryTopn(account,number,offset = 0) {
        try {
            return await this._client.request(_ledger.accountHistoryTopn,account,number,offset);
        } catch(e) {
            return e;
        }
    }

    async accountInfo(account) {
        try {
            return await this._client.request(_ledger.accountInfo,account);
        } catch(e) {
            return e;
        }
    }

    async accountRepresentative(account) {
        try {
            return await this._client.request(_ledger.accountRepresentative,account);
        } catch(e) {
            return e;
        }
    }

    async accountVotingWeight(account) {
        try {
            return await this._client.request(_ledger.accountVotingWeight,account);
        } catch(e) {
            return e;
        }
    }

    async accountsBalances(accounts) {
        try {
            return await this._client.request(_ledger.accountsBalances,accounts);
        } catch(e) {
            return e;
        }
    }

    async accountsFrontiers(accounts) {
        try {
            return await this._client.request(_ledger.accountsFrontiers,accounts);
        } catch(e) {
            return e;
        }
    }

    async accountsPending(accounts,number = 10) {
        try {
            return await this._client.request(_ledger.accountsPending,accounts, number);
        } catch(e) {
            return e;
        }
    }

    async accountsCount() {
        try {
            return await this._client.request(_ledger.accountsCount);
        } catch(e) {
            return e;
        }
    }

    async accounts(number,offset = 0) {
        try {
            return await this._client.request(_ledger.accounts,number,offset);
        } catch(e) {
            return e;
        }
    }

    async blockAccount(blockHash) {
        try {
            return await this._client.request(_ledger.blockAccount,blockHash);
        } catch(e) {
            return e;
        }
    }

    async blockHash(block) {
        try {
            return await this._client.request(_ledger.blockHash,block);
        } catch(e) {
            return e;
        }
    }

    async blocks(number,offset = 0) {
        try {
            return await this._client.request(_ledger.blocks,number,offset);
        } catch(e) {
            return e;
        }
    }

    async blocksCount() {
        try {
            return await this._client.request(_ledger.blocksCount);
        } catch(e) {
            return e;
        }
    }

    async blocksCountByType() {
        try {
            return await this._client.request(_ledger.blocksCountByType);
        } catch(e) {
            return e;
        }
    }

    async blocksInfo(blocks) {
        try {
            return await this._client.request(_ledger.blocksInfo,blocks);
        } catch(e) {
            return e;
        }
    }

    async chain(blockHashes,number = -1) {
        try {
            return await this._client.request(_ledger.chain,blockHashes,number);
        } catch(e) {
            return e;
        }
    }

    async delegators(account) {
        try {
            return await this._client.request(_ledger.delegators,account);
        } catch(e) {
            return e;
        }
    }

    async delegatorsCount(account) {
        try {
            return await this._client.request(_ledger.delegatorsCount,account);
        } catch(e) {
            return e;
        }
    }

    async process(block) {
        try {
            return await this._client.request(_ledger.process,block);
        } catch(e) {
            return e;
        }
    }

    async representatives() {
        try {
            return await this._client.request(_ledger.representatives);
        } catch(e) {
            return e;
        }
    }

    async tokens() {
        try {
            return await this._client.request(_ledger.tokens);
        } catch(e) {
            return e;
        }
    }

    async transactionsCount() {
        try {
            return await this._client.request(_ledger.transactionsCount);
        } catch(e) {
            return e;
        }
    }

    async tokenInfoById(tokenId) {
        try {
            return await this._client.request(_ledger.tokenInfoById,tokenId);
        } catch(e) {
            return e;
        }
    }

    async tokenInfoByName(tokenName) {
        try {
            return await this._client.request(_ledger.tokenInfoByName,tokenName);
        } catch(e) {
            return e;
        }
    }

    async generateSendBlock(sendBlock) {
        const accountFrom = await this.accountInfo(sendBlock.from);
        const tokens = accountFrom.result.tokens;
        const token = await this.tokenInfoByName(sendBlock.tokenName);
		const fromTokens = Array.isArray(tokens) ? tokens.filter(tokenMeta => tokenMeta.type === token.result.tokenId)[0] : null;
        const link = await this.accountPublicKey(sendBlock.to);
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

    async generateReceiveBlock(sendBlock) {
        const accountToFromPublicKey = await this.accountForPublicKey(sendBlock.link);
        let remainingDecimal = '0';
        let type = 'Receive';
        let previous = this.zeroHash;
        const accountTo = await this.accountInfo(accountToFromPublicKey.result);
        let representative = sendBlock.representative;
        if (accountTo.result) {
            const tokens = accountTo.result.tokens;
            const fromTokens = Array.isArray(tokens) ? tokens.filter(tokenMeta => tokenMeta.type === sendBlock.token)[0] : null;
            if (fromTokens) {
                remainingDecimal = new BigNumber(fromTokens.balance).plus(sendBlock.amount).toString(10);
                previous = fromTokens.header;
                representative = fromTokens.representative;
            } else {
                type = 'Open';
                remainingDecimal = new BigNumber(0).plus(sendBlock.amount).toString(10);
            }
            
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
        const accountChanging = await this.accountInfo(account);
        const changingTokens = accountChanging.result.tokens;
        const token = await this.tokenInfoByName('QLC');
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
    // ledger end

    // mintage start
    async getMintageData(mintageParams) {
        try {
            return await this._client.request(_mintage.getMintageData,mintageParams);
        } catch(e) {
            return e;
        }
    }
    async getMintageBlock(mintageParams) {
        try {
            return await this._client.request(_mintage.getMintageBlock,mintageParams);
        } catch(e) {
            return e;
        }
    }
    async getRewardBlock(block) {
        try {
            return await this._client.request(_mintage.getRewardBlock,block);
        } catch(e) {
            return e;
        }
    }
    // mintage end

    // sms start
    async phoneBlocks(phoneNumber) {
        try {
            return await this._client.request(_sms.phoneBlocks,phoneNumber);
        } catch(e) {
            return e;
        }
    }
    async messageBlocks(messageHash) {
        try {
            return await this._client.request(_sms.messageBlocks,messageHash);
        } catch(e) {
            return e;
        }
    }
    async messageHash(message) {
        try {
            return await this._client.request(_sms.messageHash,message);
        } catch(e) {
            return e;
        }
    }
    async messageStore(message) {
        try {
            return await this._client.request(_sms.messageStore,message);
        } catch(e) {
            return e;
        }
    }
    // sms end

    // net start
    async onlineRepresentatives() {
        try {
            return await this._client.request(_net.onlineRepresentatives);
        } catch(e) {
            return e;
        }
    }
    // net end

    // util start
    async rawToBalance(balance,unit,tokenName='QLC') {
        try {
            return await this._client.request(_util.rawToBalance,balance,unit,tokenName);
        } catch(e) {
            return e;
        }
    }
    async balanceToRaw(balance,unit,tokenName='QLC') {
        try {
            return await this._client.request(_util.balanceToRaw,balance,unit,tokenName);
        } catch(e) {
            return e;
        }
    }
    // util end

}
