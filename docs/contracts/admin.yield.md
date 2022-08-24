---
sidebar_position: 3
---

# Yield+ Admin

Reference documentation for the `admin.yield` contract.

## Overview

This contract provides some administrative actions that the Yield+ admins can invoke to manage the Yield+ system.

* Managing metadata key definitions: `setmetakey`, `delmetakey`
* Managing project category definitions: `setcategory`, `delcategory`

This contract has been audited by Sentnl.

## Tables

### TABLE `metakeys`

This table contains all valid metadata keys that can be specified as the metadata attached to a protocol's registration application to Yield+.

**Fields**

- `{name} key` - Metadata key
- `{name} type` - Value type (e.g.: `string`, `boolean`, `ipfs`, `url`, ...)
- `{bool} required` - Determines if this is a required metadata key
- `{string} description` - Description of this metadata key

**Example**

```json
{
    "key": "name",
    "type": "string",
    "required": true,
    "description": "Name of protocol"
}
```

### TABLE `categories`

This table contains a list of all valid protocol categories which can be specified in a protocol's registration application to Yield+.

**Fields**

- `{name} category` - Name of the protocol category
- `{string} description` - Description of the protocol category

**Example**

```json
{
    "category": "dexes",
    "description": "Protocols where you can swap/trade cryptocurrency"
}
```

## Actions

### ACTION `setmetakey`

Sets a metakey.

**Authority**

- `get_self()`

**Parameters**

- `{name} key` - Metadata key
- `{name} type` - Value type (e.g.: `string`, `boolean`, `ipfs`, `url`, ...)
- `{bool} required` - Determines if this is a required metadata key
- `{string} description` - Description of this metadata key

**Example**

```bash
$ cleos push action admin.yield setmetakey '[website, url, true, "Protocol website"]' -p admin.yield
```

### ACTION `setcategory`

Sets a protocol category.

**Authority**

- `get_self()`

**Parameters**

- `{name} category` - Name of the protocol category
- `{string} description` - Description of the protocol category

**Example**

```bash
$ cleos push action admin.yield setcategory '[dexes, "Protocols where you can swap/trade cryptocurrency"]' -p admin.yield
```

### ACTION `delcategory`

Deletes a protocol category.

**Authority**

- `get_self()`

**Parameters**

- `{name} category` - Name of the protocol category to delete

**Example**

```bash
$ cleos push action admin.yield delcategory '[dexes]' -p admin.yield
```

### ACTION `delmetakey`

Deletes a metakey.

**Authority**

- `get_self()`

**Parameters**

- `{name} key` - Metadata key to delete

**Example**

```bash
$ cleos push action admin.yield delmetakey '[website]' -p admin.yield
```
