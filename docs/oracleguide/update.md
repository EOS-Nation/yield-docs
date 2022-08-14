---
sidebar_position: 3
---

# Working

This section shows how to put your TVL oracle to work.

Once your TVL oracle is approved, you can set it up to invoke the `update` and `updateall` actions on the `oracle.yield` contract. This performs work for the Yield+ system, which costs blockchain resources. In turn, your TVL oracle accumulates token rewards that you can claim later.

## Batch project updates

The easiest way to collect rewards for working for Yield+ is to set up an automated process, in a reliable server, to invoke the `updateall` action in regular intervals. This will update the records of the next several registered DeFi projects in the queue, up to an amout that you specify.

Here's an example `updateall` call:

```bash
cleos push action oracle.yield updateall '[myoracle, 20]' -p myoracle
```

The `updateall` action takes two arguments. The first argument is the name of your TVL oracle's account (`myoracle`, in the example). The second argument is the number of projects that you are willing to work on in this call (`20`, in the example).

The number of projects to work on can be any number. However, too high a number may cause the transaction to exhaust your oracle account's blockchain resources or hit the maximum processing time allowed by the blockchain for your transaction, both of which will cause it to fail. You should experiment with alternative values for this argument to find out which one works best for you.

## Updating a specific protocol

If your TVL oracle is being set up to insure that a specific protocol's state inside Yield+ is being updated, you can instead use the `update` action.

Here's an example:

```bash
cleos push action oracle.yield update '[myoracle, myprotocol]' -p myoracle
```

The `update` action takes two arguments. The first argument is the name of your TVL oracle's account (`myoracle`, in the example). The second argument is the name of the specific protocol (dApp, project) you want to update.

