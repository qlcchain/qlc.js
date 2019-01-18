import { type } from 'os'

export const enum account {
  accountsBalances = 'account_accountsBalances',
  accountsPending = 'account_accountsPending'
}

export const enum ledger {
  process = 'ledger_process',
  blocksInfo = 'ledger_blocksInfo'
}

export const enum wallet {
  createAccount = 'wallet_createAccount'
}

export type accountFun = {
  accountsBalances: Function
  accountsPending: Function
}

export type ledgerFun = {
  processFun: Function
}

export type walletFun = {
  createAccount: Function
}

type methods = account | ledger | wallet

export default methods
