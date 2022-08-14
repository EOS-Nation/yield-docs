---
sidebar_position: 2
---

# Registering

This section shows how to register your TVL oracle.

## Simple registration with `regoracle`

Here's a sample TVL oracle registration request through the `regoracle` action on the `oracle.yield` contract:

```bash
cleos push action oracle.yield regoracle '[myoracle, [{"key": "url", "value": "https://myoracle.com"}]]' -p myoracle
```

The first argument to the `regoracle` action is the on-chain account name of the TVL oracle, which in the example above is `myoracle`. The second argument contains any additional information on your oracle that you may want to provide, which helps the Yield+ admins to weed out spam registration requests. This metadata argument is in the format of a list of `key` and `value` pairs.

Your oracle will have to be approved by the Yield+ admins. You can query the status of your oracle's approval by querying the `oracles` table of the `oracle.yield` contract. The `status` field will be either set to `pending` (registration request awaiting approval), `active` (if your oracle is approved) or `denied` (if your request is denied).

Once your oracle is approved, it can start working and collecting rewards.

## Other registration actions

To improve the likelihood that your oracle being accepted, you may want to submit additional metadata fields, or change existing fields. For that you can use the `setmetakey` and `setmetadata` actions on the `oracle.yield` contract.

If you ever want to cancel your registration request or remove your approved oracle from the Yield+ system, you can call the `unregister` action on the `oracle.yield` contract.

Please refer to the [Yield+ Oracle contract reference documentation](../contracts/oracle.yield.md) for more information on these actions.