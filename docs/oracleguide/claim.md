---
sidebar_position: 4
---

# Claiming rewards

This section shows how to claim TVL oracle rewards.

Pending rewards are claimed by calling the `claim` action on the `oracle.yield` contract.

If you want your oracle's account to collect the rewards, you can call the action like this:

```bash
cleos push action oracle.yield claim '[myoracle, null]' -p myoracle
```

In the above example, `myoracle` is your TVL oracle's account.

If you want the rewards to be forwarded to another specific account, you can call the action like this:

```bash
cleos push action oracle.yield claim '[myoracle, myreceiver]' -p myoracle
```

In the above example, `myoracle` is your TVL oracle's account, and `myreceiver` is the name of the account that is going to receive the rewards.
