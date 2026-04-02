#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env};

#[contracttype]
pub enum DataKey {
    Admin,
    Ledger(Address),
}

#[contract]
pub struct CryptoWalletContract;

#[contractimpl]
impl CryptoWalletContract {
    /// Initialize the wallet contract with an admin/owner address
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Contract is already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    /// Record a deposit amount to a specific user's ledger
    pub fn deposit(env: Env, user: Address, amount: i128) {
        user.require_auth();
        
        if amount <= 0 {
            panic!("Deposit amount must be greater than zero");
        }

        let mut balance: i128 = env.storage().persistent().get(&DataKey::Ledger(user.clone())).unwrap_or(0);
        balance = balance.checked_add(amount).expect("Integer overflow");
        env.storage().persistent().set(&DataKey::Ledger(user.clone()), &balance);

        env.events().publish((symbol_short!("deposit"), user), amount);
    }

    /// Get the balance of a specific user
    pub fn get_balance(env: Env, user: Address) -> i128 {
        env.storage().persistent().get(&DataKey::Ledger(user)).unwrap_or(0)
    }
}

mod test;
