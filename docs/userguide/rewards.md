---
sidebar_position: 2
---

# Claiming rewards

This section shows how to claim Yield+ protocol rewards.

When your DeFi project is assigned token rewards by the Yield+ system, which happens after 24 hours of your project's registration request being approved and your protocol being eligible for rewards, and from then on every 10 minutes, you can collect them by invoking the `claim` action on the `eosio.yield` contract.

For the examples below, you will need the `cleos` wallet installed and loaded with the authorization key for your protocol's contract.  

If you want to send the token rewards to the protocol's smart contract, you can call e.g.:

```bash
cleos push action eosio.yield claim '[myprotocol, null]' -p myprotocol
```

In the above example, `myprotocol` is your protocol's contract account.

If you want to send the rewards to any other account, you can call e.g.:

```bash
cleos push action eosio.yield claim '[myprotocol, myreceiver]' -p myprotocol
```

In the above example, `myprotocol` is your protocol's contract account, and `myreceiver` is the account that is going to receive the rewards.