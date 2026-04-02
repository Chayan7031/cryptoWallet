#![cfg(test)]

use super::*;
use soroban_sdk::{Env, testutils::Address as _};

#[test]
fn test_deposit() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(CryptoWalletContract, ());
    let client = CryptoWalletContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let user = Address::generate(&env);

    client.initialize(&admin);

    assert_eq!(client.get_balance(&user), 0);

    client.deposit(&user, &5000);

    assert_eq!(client.get_balance(&user), 5000);
}
