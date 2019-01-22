export const enum account {
  accountCreate = 'account_create',
  accountForPublicKey = 'account_forPublicKey'
}

export const enum ledger {
  process = 'ledger_process',
  blocksInfo = 'ledger_blocksInfo'
}

export const enum wallet {
  getBalance = 'wallet_getBalance',
  getRawKey = 'wallet_getRawKey'
}

export const enum qlcclassic {
  accountsFrontiers = 'qlcclassic_accountsFrontiers',
  accountsBalances = 'qlcclassic_accountsBalances',
  accountHistoryTopn = 'qlcclassic_accountHistoryTopn',
  accountsPending = 'qlcclassic_accountsPending',
  accountInfo = 'qlcclassic_accountInfo',
  validateAccount = 'qlcclassic_validateAccount',
  blocksInfo = 'qlcclassic_blocksInfo',
  process = 'qlcclassic_process',
  tokens = 'qlcclassic_tokens',
  onlineRepresentatives = 'qlcclassic_getOnlineRepresentatives'
}

export type accountFun = {
  accountsBalances: Function;
  accountsPending: Function;
};

export type ledgerFun = {
  processFun: Function;
};

export type walletFun = {
  createAccount: Function;
};

export type qlcclassicFun = {
  accountsFrontiers: Function;
  accountsBalances: Function;
  accountHistoryTopn: Function;
  accountsPending: Function;
  accountInfo: Function;
  validateAccount: Function;
  blocksInfo: Function;
  process: Function;
  tokens: Function;
  onlineRepresentatives: Function;
};

type methods = account | ledger | wallet | qlcclassic;

export default methods;
