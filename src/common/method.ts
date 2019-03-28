export const enum account {
  accountCreate = 'account_create',
  accountForPublicKey = 'account_forPublicKey',
  accountPublicKey = 'account_publicKey',
  accountValidate = 'account_validate'
}

export type accountFun = {
  accountCreate: Function;
  accountForPublicKey: Function;
  accountPublicKey: Function;
  accountValidate: Function;
};

export const enum ledger {
  accountBlocksCount = 'ledger_accountBlocksCount',
  accountHistoryTopn = 'ledger_accountHistoryTopn',
  accountInfo = 'ledger_accountInfo',
  accountRepresentative = 'ledger_accountRepresentative',
  accountVotingWeight = 'ledger_accountVotingWeight',
  accountsBalances = 'ledger_accountsBalances',
  accountsFrontiers = 'ledger_accountsFrontiers',
  accountsPending = 'ledger_accountsPending',
  accountsCount = 'ledger_accountsCount',
  accounts = 'ledger_accounts',
  blockAccount = 'ledger_blockAccount',
  blockHash = 'ledger_blockHash',
  blocks = 'ledger_blocks',
  blocksCount = 'ledger_blocksCount',
  blocksCountByType = 'ledger_blocksCountByType',
  blocksInfo = 'ledger_blocksInfo',
  chain = 'ledger_chain',
  delegators = 'ledger_delegators',
  delegatorsCount = 'ledger_delegatorsCount',
  generateSendBlock = 'ledger_generateSendBlock',
  generateReceiveBlock = 'ledger_generateReceiveBlock',
  generateChangeBlock = 'ledger_generateChangeBlock',
  process = 'ledger_process',
  representatives = 'ledger_representatives',
  tokens = 'ledger_tokens',
  transactionsCount = 'ledger_transactionsCount',
  tokenInfoById = 'ledger_tokenInfoById',
  tokenInfoByName = 'ledger_tokenInfoByName'
}

export type ledgerFun = {
  accountBlocksCount: Function;
  accountHistoryTopn: Function;
  accountInfo: Function;
  accountRepresentative: Function;
  accountVotingWeight: Function;
  accountsBalances: Function;
  accountsFrontiers: Function;
  accountsPending: Function;
  accountsCount: Function;
  blockAccount: Function;
  blockHash: Function;
  blocksCount: Function;
  blocksCountByType: Function;
  blocksInfo: Function;
  chain: Function;
  delegators: Function;
  delegatorsCount: Function;
  generateSendBlock: Function;
  generateReceiveBlock: Function;
  generateChangeBlock: Function;
  process: Function;
  representatives: Function;
  tokens: Function;
  transactionsCount: Function;
};

export const enum mintage {
  getMintageData = 'mintage_getMintageData',
  getMintageBlock = 'mintage_getMintageBlock',
  getRewardBlock = 'mintage_getRewardBlock'
}

export const enum sms {
  phoneBlocks = 'sms_phoneBlocks',
  messageBlock = 'sms_messageBlock',
  messageHash = 'sms_messageHash',
  messageStore = 'sms_messageStore'
}


export const enum wallet {
  getBalances = 'wallet_getBalances',
  getRawKey = 'wallet_getRawKey',
  newSeed = 'wallet_newSeed',
  newWallet = 'wallet_newWallet',
  changePassword = 'wallet_changePassword'
}

export type walletFun = {
  getBalances: Function;
  getRawKey: Function;
  newSeed: Function;
  newWallet: Function;
};

export const enum net {
  onlineRepresentatives = 'net_onlineRepresentatives'
}

export type netFun = {
  onlineRepresentatives: Function;
};

export const enum util {
  decrypt = 'util_decrypt',
  encrypt = 'util_encrypt',
  rawToBalance = 'util_rawToBalance',
  balanceToRaw = 'util_balanceToRaw'
}

export type utilFun = {
  decrypt: Function;
  encrypt: Function;
  rawToBalance: Function;
  balanceToRaw: Function;
};

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

type methods = account | ledger | mintage | sms | wallet | net | util | qlcclassic;

export default methods;
