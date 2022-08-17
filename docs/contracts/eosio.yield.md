---
sidebar_position: 1
---

# Yield+ Rewards

Reference documentation for the `eosio.yield` contract.

## Overview

This contract provides user and administration interfaces for the Yield+ rewards program.

* Registration actions: `regprotocol`, `setcontracts`, `setevm`, `setmetadata`, `setmetakey`, `setcategory`, `unregister`
* Rewards claiming actions: `claim`
* Administrative registration actions: `approve`, `deny`
* Administrative system configuration actions: `init`, `setrate`
* Inline actions: `report`
* Logging actions: `claimlog`, `rewardslog`, `statuslog`, `contractslog`, `categorylog`, `createlog`, `eraselog`, `metadatalog`

This contract has been audited by Sentnl.

## Tables

### TABLE `config`

This table contains the global configuration parameters for the Yield+ rewards system.

**Fields**

- `{uint16_t} annual_rate` - Annual rate (pips 1/100 of 1%)
- `{asset} min_tvl_report` - Minimum TVL report
- `{asset} max_tvl_report` - Maximum TVL report
- `{extended_symbol} rewards` - Rewards token
- `{name} oracle_contract` - Yield+ Oracle contract
- `{name} admin_contract` - Yield+ admin contract

**Example**

```json
{
    "annual_rate": 500,
    "min_tvl_report": "200000.0000 EOS",
    "max_tvl_report": "6000000.0000 EOS",
    "rewards": {"sym": "4,EOS", "contract": "eosio.token"},
    "oracle_contract": "oracle.yield",
    "admin_contract": "admin.yield"
}
```

### TABLE `state`

This table contains the list of active protocols.

**Fields**

- `{set<name>} active_protocols` - Array of active protocols

**Example**

```json
{
    "active_protocols": ["myprotocol"]
}
```

### TABLE `protocols`

This table contains the list of all known protocols and the state of each one.

**Fields**

- `{name} protocol` - Primary protocol contract
- `{name} status="pending"` - Status (`pending`, `active` or `denied`)
- `{name} category` - Protocol category (e.g.: `dexes`, `lending`, `staking`)
- `{set<name>} contracts` - Additional supporting EOS contracts
- `{set<string>} evm` - Additional supporting EVM contracts
- `{asset} tvl` - Reported TVL averaged value in EOS
- `{asset} usd` - Reported TVL averaged value in USD
- `{extended_asset} balance` - Balance available to be claimed
- `{map<string, string} metadata` - Descriptive protocol metadata
- `{time_point_sec} created_at` - Time created
- `{time_point_sec} updated_at` - Time last updated
- `{time_point_sec} claimed_at` - Time last claimed
- `{time_point_sec} period_at` - Time marker for measurement period calculations

**Example**

```json
{
    "protocol": "myprotocol",
    "status": "active",
    "category": "dexes",
    "contracts": ["myprotocol", "mytreasury"],
    "evm": ["0x2f9ec37d6ccfff1cab21733bdadede11c823ccb0"],
    "tvl": "200000.0000 EOS",
    "usd": "300000.0000 USD",
    "balance": {"quantity": "2.5000 EOS", "contract": "eosio.token"},
    "metadata": [{"key": "name", "value": "My Protocol"}, {"key": "website", "value": "https://myprotocol.com"}],
    "created_at": "2022-05-13T00:00:00",
    "updated_at": "2022-05-13T00:00:00",
    "claimed_at": "1970-01-01T00:00:00",
    "period_at": "1970-01-01T00:00:00"
}
```

## Actions

### ACTION `init`

Initializes the rewards contract.

**Authority**

- `get_self()`

**Parameters**

- `{extended_symbol} rewards` - Yield+ rewards token
- `{name} oracle_contract` - Yield+ oracle contract
- `{name} admin_contract` - Yield+ admin contract

**Example**

```bash
$ cleos push action eosio.yield init '[["4,EOS", "eosio.token"], oracle.yield, admin.yield]' -p eosio.yield
```

### ACTION `setrate`

Sets the TVL rewards rate to the specified basis points.

**Authority**

- `get_self()`

**Parameters**

- `{uint16_t} annual_rate` - Annual rate (pips 1/100 of 1%)
- `{asset} min_tvl_report` - Minimum TVL report
- `{asset} max_tvl_report` - Maximum TVL report

**Example**

```bash
$ cleos push action eosio.yield setrate '[500, "200000.0000 EOS", "6000000.0000 EOS"]' -p eosio.yield
```

### ACTION `regprotocol`

Submits a registration request to Yield+ for the specified protocol.

**Authority**

- `protocol`

**Parameters**

- `{name} protocol` - Protocol main contract
- `{name} category` - Protocol category (e.g.: `dexes`, `lending`, `yield`)
- `{map<name, string>} metadata` - Descriptive protocol metadata as an array of `key` and `value` pairs

**Example**

```bash
$ cleos push action eosio.yield regprotocol '[myprotocol, dexes, [{"key": "website", "value":"https://myprotocol.com"}]]' -p myprotocol
```

### ACTION `setmetadata`

Sets the metadata for a protocol.

**Authority**

- `protocol`
- `admin.yield`

**Parameters**

- `{name} protocol` - Protocol main contract
- `{map<name, string>} metadata` - Descriptive protocol metadata as an array of `key` and `value` pairs

**Example**

```bash
$ cleos push action eosio.yield setmetadata '[myprotocol, [{"key": "website", "value":"https://myprotocol.com"}]]' -p myprotocol
```

### ACTION `setmetakey`

Sets a metadata key to the specified value.

**Authority**

- `protocol`
- `admin.yield`

**Parameters**

- `{name} protocol` - Protocol main contract
- `{name} key` - metakey (e.g.: `name`, `website`, `description`)
- `{string} [value=null]` - Metakey value (if empty, will erase the metakey)

**Example**

```bash
$ cleos push action eosio.yield setmetakey '[myprotocol, website, "https://myprotocol.com"]' -p myprotocol
```

### ACTION `unregister`

Cancels a protocol's registration, removing it from the Yield+ system.

**Authority**

- `protocol`

**Parameters**

- `{name} protocol` - Protocol main contract

**Example**

```bash
$ cleos push action eosio.yield unregister '[myprotocol]' -p myprotocol
```

### ACTION `setcontracts`

Sets the smart contracts for the specified protocol.

**Authority**

- `protocol` + `contracts`
- `admin.yield`

**Parameters**

- `{name} protocol` - Protocol (will be included in EOS contracts)
- `{set<name>} contracts` - Additional EOS contracts

**Example**

```bash
$ cleos push action eosio.yield setcontracts '[myprotocol, [myvault]]' -p myprotocol -p myvault
```

### ACTION `setevm`

Sets the EVM smart contracts for the specified protocol.

**Authority**

- `protocol` + `evm`
- `admin.yield`

**Parameters**

- `{name} protocol` - Protocol (will be included in EOS contracts)
- `{set<string>} evm` - Additional EVM contracts

**Example**

```bash
$ cleos push action eosio.yield setevm '[myprotocol, ["0x2f9ec37d6ccfff1cab21733bdadede11c823ccb0"]]' -p myprotocol
```

### ACTION `approve`

Approves a protocol for the Yield+ rewards program.

**Authority**

- `admin.yield`

**Parameters**

- `{name} protocol` - Protocol main contract

**Example**

```bash
$ cleos push action eosio.yield approve '[myprotocol]' -p admin.yield
```

### ACTION `setcategory`

Sets the category of a protocol.

**Authority**

- `protocol`
- `admin.yield`

**Parameters**

- `{name} protocol` - Protocol main contract
- `{name} category` - Protocol category (eligible categories in `admin.yield`)

**Example**

```bash
$ cleos push action eosio.yield setcategory '[myprotocol, dexes]' -p admin.yield
```

### ACTION `deny`

Denies a protocol's registration application for the Yield+ rewards program.

**Authority**

- `admin.yield`

**Parameters**

- `{name} protocol` - Protocol main contract

**Example**

```bash
$ cleos push action eosio.yield deny '[myprotocol]' -p admin.yield
```

### ACTION `claim`

Claims the Yield+ rewards for a protocol.

**Authority**

- `protocol`

**Parameters**

- `{name} protocol` - Protocol main contract
- `{name} [receiver=""]` - Rewards receiver (if empty, defaults to `protocol`)

**Example**

Sending rewards to `myprotocol`:

```bash
$ cleos push action eosio.yield claim '[myprotocol, null]' -p myprotocol
```

Sending rewards to `myreceiver`:

```
$ cleos push action eosio.yield claim '[myprotocol, myreceiver]' -p myprotocol
```

### ACTION `claimlog`

Generates a log each time Yield+ rewards are claimed.

**Authority**

- `get_self()`

**Parameters**

- `{name} protocol` - Protocol main contract
- `{name} category` - Protocol category
- `{name} receiver` - Rewards receiver
- `{asset} claimed` - Rewards claimed

**Example**

```json
{
    "protocol": "myprotocol",
    "category": "dexes",
    "receiver": "myreceiver",
    "claimed":"1.5500 EOS"
}
```

### ACTION `report`

Generates a report of the current TVL for a protocol.

**Authority**

- `oracle.yield`

**Parameters**

- `{name} protocol` - Protocol main contract
- `{time_point_sec} period` - Period time
- `{uint32_t} period_interval` - Period interval (in seconds)
- `{asset} tvl` - TVL averaged value in EOS
- `{asset} usd` - TVL averaged value in USD

**Example**

```bash
$ cleos push action eosio.yield report '[myprotocol, "2022-05-13T00:00:00", 600, "200000.0000 EOS", "300000.0000 USD"]' -p oracle.yield
```

### ACTION `rewardslog`

Generates a log when rewards are generated from reports.

**Authority**

- `get_self()`

**Parameters**

- `{name} protocol` - Protocol main contract
- `{name} category` - Protocol category
- `{time_point_sec} period` - Period time
- `{uint32_t} period_interval` - Period interval (in seconds)
- `{asset} tvl` - TVL averaged value in EOS
- `{asset} usd` - TVL averaged value in USD
- `{asset} rewards` - TVL rewards
- `{asset} balance` - Current claimable balance

**Example**

```json
{
    "protocol": "myprotocol",
    "category": "dexes",
    "period": "2022-05-13T00:00:00",
    "period_interval": 600,
    "tvl": "200000.0000 EOS",
    "usd": "300000.0000 USD",
    "rewards": "2.5500 EOS",
    "balance": "10.5500 EOS"
}
```

### ACTION `statuslog`

Generates a log when a protocol's status is modified.

**Authority**

- `get_self()`

**Parameters**

- `{name} protocol` - Protocol main contract
- `{name} status="pending"` - Protocol status (`pending`, `active`, `denied`)

**Example**

```json
{
    "protocol": "myprotocol",
    "status": "active",
}
```

### ACTION `contractslog`

Generates a log when a protocol's contracts are modified.

**Authority**

- `get_self()`

**Parameters**

- `{name} protocol` - Primary protocol contract
- `{set<name>} contracts.eos` - Additional supporting EOS contracts
- `{set<string>} contracts.evm` - Additional supporting EVM contracts

**Example**

```json
{
    "protocol": "myprotocol",
    "contracts": ["myprotocol", "mytreasury"],
    "evm": ["0x2f9ec37d6ccfff1cab21733bdadede11c823ccb0"]
}
```

### ACTION `categorylog`

Generates a log when a protocol's category is modified.

**Authority**

- `get_self()`

**Parameters**

- `{name} protocol` - Primary protocol contract
- `{name} category` - Protocol category (e.g.: `dexes`, `lending`, `staking`)

**Example**

```json
{
    "protocol": "myprotocol",
    "category": "dexes"
}
```

### ACTION `createlog`

Generates a log when a protocol is created.

**Authority**

- `get_self()`

**Parameters**

- `{name} protocol` - Primary protocol contract
- `{name} category` - Protocol category (e.g.: `dexes`, `lending`, `staking`)
- `{map<string, string>} metadata` - Descriptive protocol metadata as an array of `key` and `value` pairs

**Example**

```json
{
    "protocol": "myprotocol",
    "category": "dexes",
    "metadata": [{"key": "name", "value": "My Protocol"}, {"key": "website", "value": "https://myprotocol.com"}]
}
```

### ACTION `eraselog`

Generates a log when a protocol is erased.

**Authority**

- `get_self()`

**Parameters**

- `{name} protocol` - Protocol main contract

**Example**

```json
{
    "protocol": "myprotocol"
}
```

### ACTION `metadatalog`

Generates a log when a protocol's metadata is modified.

**Authority**

- `get_self()`

**Parameters**

- `{name} protocol` - Protocol main contract
- `{map<string, string>} metadata` - Descriptive protocol metadata as an array of `key` and `value` pairs

**Example**

```json
{
    "protocol": "myprotocol",
    "metadata": [{"key": "name", "value": "My Protocol"}, {"key": "website", "value": "https://myprotocol.com"}]
}
```