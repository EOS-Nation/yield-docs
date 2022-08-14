---
sidebar_position: 2
---

# Yield+ Oracle

Reference documentation for the `oracle.yield` contract.

## Overview

The Yield+ Oracle system supports the Yield+ Rewards contract by providing reliable TVL metrics of DeFi protocols by leveraging decentralized data price feeds from existing oracle providers on the EOS mainnet.

* TVL oracle registration actions: `regoracle`, `setmetadata`, `setmetakey`, `unregister`
* TVL oracle work actions: `update`, `updateall`
* TVL oracle claim actions: `claim`
* Administrative TVL oracle registration actions: `approve`, `deny`, `addtoken`, `deltoken`
* Administrative system configuration actions: `init`, `setreward`
* Logging actions: `updatelog`, `claimlog`, `rewardslog`

This contract has been audited by Sentnl.

## Tables

### TABLE `config`

This table contains the global configuration parameters for the Yield+ TVL oracle system.

**Fields**

- `{extended_asset} reward_per_update` - reward per update (e.g. `0.0200 EOS`)
- `{name} yield_contract` - Yield+ core contract
- `{name} admin_contract` - Yield+ admin contract

**Example**

```json
{
    "reward_per_update": {"contract": "eosio.token", "quantity": "0.0200 EOS"},
    "yield_contract": "eosio.yield",
    "admin_contract": "admin.yield"
}
```

### TABLE `tokens`

This table specifies the tokens supported by the Yield+ TVL oracle system.

**Fields**

- `{symbol} sym` - Token symbol (primary key)
- `{name} contract` - Token contract
- `{uint64_t} [defibox_oracle_id=null]` - Defibox oracle ID (optional)
- `{name} [delphi_oracle_id=null]` - Delphi oracle ID (optional)
- `{uint64_t} [extra_oracle_id=null]` - Extra oracle ID (optional)

**Example**

```json
{
    "sym": "4,EOS",
    "contract": "eosio.token",
    "defibox_oracle_id": 1,
    "delphi_oracle_id": "eosusd",
    "extra_oracle_id": null
}
```

### TABLE `periods`

This table contains the TVL reports for each monitored protocol.

**Scope**

- `{name} protocol` - Filters by the protocol (via its main contract name)

**Fields**

- `{time_point_sec} period` - Period at time (primary key)
- `{name} protocol` - Protocol main contract
- `{name} category` - Protocol category
- `{set<name>} contracts.eos` - Additional supporting EOS contracts
- `{set<string>} contracts.evm` - Additional supporting EVM contracts
- `{vector<asset>} balances` - Asset balances
- `{vector<asset>} prices` - Currency prices
- `{asset} tvl` - Reported TVL averaged value in EOS
- `{asset} usd` - Reported TVL averaged value in USD

**Example**

```json
{
    "period": "2022-05-13T00:00:00",
    "protocol": "myprotocol",
    "contracts": ["myprotocol", "mytreasury"],
    "evm": ["0x2f9ec37d6ccfff1cab21733bdadede11c823ccb0"],
    "balances": ["1000.0000 EOS", "1500.0000 USDT"],
    "prices": ["1.5000 USD", "1.0000 USD"],
    "tvl": "200000.0000 EOS",
    "usd": "300000.0000 USD"
}
```

### TABLE `oracles`

This table lists all of the registered TVL oracles.

**Fields**

- `{name} oracle` - TVL oracle account
- `{name} status="pending"` - Oracle registration status (`pending`, `active`, `denied`)
- `{extended_asset} balance` - Balance available to be claimed
- `{map<string, string} metadata` - TVL oracle metadata
- `{time_point_sec} created_at` - Created at time
- `{time_point_sec} updated_at` - Last update time 
- `{time_point_sec} claimed_at` - Last claim time

**Example**

```json
{
    "oracle": "myoracle",
    "status": "active",
    "balance": {"quantity": "2.5000 EOS", "contract": "eosio.token"},
    "metadata": [{"key": "url", "value": "https://myoracle.com"}],
    "created_at": "2022-05-13T00:00:00",
    "updated_at": "2022-05-13T00:00:00",
    "claimed_at": "1970-01-01T00:00:00"
}
```

## Actions

### ACTION `init`

Initializes the Yield+ Oracle contract.

**Authority**

- `get_self()`

**Parameters**

- `{extended_symbol} rewards` - Yield+ oracle rewards token
- `{name} yield_contract` - Yield+ core contract
- `{name} admin_contract` - Yield+ admin contract

**Example**

```bash
$ cleos push action oracle.yield init '[["4,EOS", "eosio.token"], rewards.yield, admin.yield]' -p oracle.yield
```


### ACTION `addtoken`

Adds a token as a supported asset.

**Authority**

- `get_self()`

**Parameters**

- `{symbol_code} symcode` - Token symbol code
- `{name} contract` - Token contract
- `{uint64_t} [defibox_oracle_id=""]` - Defibox oracle ID (optional)
- `{name} [delphi_oracle_id=""]` - Delphi oracle ID (optional)

**Example**

```bash
$ cleos push action oracle.yield addtoken '["EOS", "eosio.token", 1, "eosusd"]' -p oracle.yield
```

### ACTION `deltoken`

Removes a token as supported asset.

**Authority**

- `get_self()`

**Parameters**

- `{symbol_code} symcode` - Token symbol code

**Example**

```bash
$ cleos push action oracle.yield deltoken '["EOS"]' -p oracle.yield
```

### ACTION `setreward`

Sets oracle rewards.

**Authority**

- `get_self()`

**Parameters**

- `{asset} reward_per_update` - Reward per update

**Example**

```bash
$ cleos push action oracle.yield setreward '["0.0200 EOS"]' -p oracle.yield
```

### ACTION `regoracle`

Submits a registration request for a TVL oracle to the Yield+ Oracle contract.

**Authority**

- `oracle`

**Parameters**

- `{name} oracle` - TVL oracle account
- `{map<string, string} metadata` - Oracle metadata

**Example**

```bash
$ cleos push action oracle.yield regoracle '[myoracle, [{"key": "url", "value": "https://myoracle.com"}]]' -p myoracle
```

### ACTION `unregister`

Unregisters a TVL oracle from the Yield+ Oracle contract.

**Authority**

- `oracle`

**Parameters**

- `{name} oracle` - TVL oracle account

**Example**

```bash
$ cleos push action oracle.yield unregister '[myoracle]' -p myoracle
```

### ACTION `setmetadata`

Sets the metadata of a registered TVL oracle.

**Authority**

- `oracle`
-``admin.yield`

**Parameters**

- `{name} oracle` - TVL oracle account
- `{map<name, string>} metadata` - Oracle metadata (optional)

**Example**

```bash
$ cleos push action eosio.oracle setmetadata '[myoracle, [{"key": "website", "value":"https://myoracle.com"}]]' -p myoracle
```

### ACTION `setmetakey`

Sets a specific metadata key-value pair.

**Authority**

- `oracle`
- `admin.yield`

**Parameters**

- `{name} oracle` - TVL oracle account
- `{name} key` - Metakey (e.g.: `name`, `website`, `description`)
- `{string} [value=null]` - Metakey value (if empty, will erase metakey)

**Example**

```bash
$ cleos push action eosio.oracle setmetakey '[myoracle, website, "https://myoracle.com"]' -p myoracle
```

### ACTION `approve`

Approves a TVL oracle registration.

**Authority**

- `admin.yield`

**Parameters**

- `{name} oracle` - TVL oracle account

**Example**

```bash
$ cleos push action oracle.yield approve '[myoracle]' -p admin.yield
```

### ACTION `deny`

Deny a TVL oracle registration.

**Authority**

- `admin.yield`

**Parameters**

- `{name} oracle` - TVL oracle account

**Example**

```bash
$ cleos push action oracle.yield deny '[myoracle]' -p admin.yield
```

### ACTION `update`

Update TVL values for a specific protocol.

**Authority**

- `oracle`

**Parameters**

- `{name} oracle` - TVL oracle account (must be approved)
- `{name} protocol` - Protocol account to update

**Example**

```bash
$ cleos push action oracle.yield update '[myoracle, myprotocol]' -p myoracle
```

### ACTION `updateall`

Update the TVL for any number of protocols.

**Authority**

- `oracle`

**Parameters**

- `{name} oracle` - TVL oracle account (must be approved)
- `{uint16_t} [max_rows=20]` - Maximum rows to process (optional)

**Example**

```bash
$ cleos push action oracle.yield updateall '[myoracle, 20]' -p myoracle
```

### ACTION `updatelog`

Generates a log when a TVL oracle updates a protocol.

**Authority**

- `get_self()`

**Parameters**

- `{name} oracle` - TVL oracle that performed the update
- `{name} protocol` - Protocol updated
- `{name} category` - Orotocol category
- `{set<name>} contracts` - EOS contracts
- `{set<string>} evm` - EVM contracts
- `{time_point_sec} period` - Time period
- `{vector<asset>} balances` - Balances in all contracts
- `{vector<asset>} prices` - Prices of assets
- `{asset} tvl` - Overall TVL
- `{asset} usd` - Overall TVL in USD

**Example**

```json
{
    "oracle": "myoracle",
    "protocol": "myprotocol",
    "category": "dexes",
    "contracts": ["myprotocol"],
    "evm": [],
    "period": "2022-06-16T01:40:00",
    "balances": ["200000.0000 EOS"],
    "prices": ["1.5000 USD"],
    "tvl": "200000.0000 EOS",
    "usd": "300000.0000 USD"
}
```

### ACTION `claim`

Claims rewards for a TVL oracle.

**Authority**

- `oracle`

**Parameters**

- `{name} oracle` - TVL oracle account
- `{name} [receiver=""]` - Rewards receiver (default: `oracle`)

**Example**

Send rewards to `myoracle`:

```bash
$ cleos push action oracle.yield claim '[myoracle, null]' -p myoracle
```

Send rewards to `myreceiver`:

```bash
$ cleos push action oracle.yield claim '[myoracle, myreceiver]' -p myoracle
```

### ACTION `claimlog`

Generates a log when a TVL oracle claims rewards.

**Authority**

- `get_self()`

**Parameters**

- `{name} oracle` - TVL oracle account
- `{name} [category=oracle]` - Oracle category type
- `{name} receiver` - Rewards receiver
- `{asset} claimed` - Rewards claimed

**Example**

```json
{
    "oracle": "myoracle",
    "category": "oracle",
    "receiver": "myreceiver",
    "claimed": "1.5500 EOS"
}
```

### ACTION `statuslog`

Generates a log when the status of a TVL oracle's registration is modified.

**Authority**

- `get_self()`

**Parameters**

- `{name} oracle` - TVL oracle account
- `{name} status="pending"` - Oracle status (`pending`, `active`, `denied`)

**Example**

```json
{
    "oracle": "myoracle",
    "status": "active",
}
```

### ACTION `createlog`

Generates a log when a TVL oracle is registered in the Yield+ Oracle contract.

**Authority**

- `get_self()`

**Parameters**

- `{name} oracle` - TVL oracle account
- `{name} [category=oracle]` - Oracle category type
- `{map<string, string>} metadata` - Oracle metadata

**Example**

```json
{
    "oracle": "myoracle",
    "category": "oracle",
    "metadata": [{"key": "name", "value": "My oracle"}, {"key": "website", "value": "https://myoracle.com"}]
}
```

### ACTION `eraselog`

Generates a log when a TVL oracle is erased from the Yield+ Oracle contract.

**Authority**

- `get_self()`

**Parameters**

- `{name} oracle` - TVL oracle account

**Example**

```json
{
    "oracle": "myoracle"
}
```

### ACTION `metadatalog`

Generates a log when a TVL oracle has its metadata modified.

**Authority**

- `get_self()`

**Parameters**

- `{name} oracle` - TVL oracle account
- `{map<string, string>} metadata` - Oracle metadata

**Example**

```json
{
    "oracle": "myoracle",
    "metadata": [{"key": "name", "value": "My oracle"}, {"key": "website", "value": "https://myoracle.com"}]
}
```

### ACTION `rewardslog`

Generates a log when rewards are generated for a TVL oracle for protocol update work performed.

**Authority**

- `get_self()`

**Parameters**

- `{name} oracle` - TVL oracle account
- `{asset} rewards` - Rewards generated for the oracle
- `{asset} balance` - Current total claimable rewards balance for the oracle

**Example**

```json
{
    "oracle": "myoracle",
    "rewards": "2.5500 EOS",
    "balance": "10.5500 EOS"
}
```