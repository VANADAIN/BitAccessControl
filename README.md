# Bit access control

Most of the smart-contacts don't use a lot of roles inside access control. This version is gas-optimized access control for `DEFAULT_ADMIN` and 7 other roles.
This smart contract is actually a copy of default OZ AccessControl.sol, but the roles itself has a type of uint8 bitmask instead of bytes32.

```
uint8 public constant MINTER = uint8(1) << 1; // 00000010
```

As you can see, each of the role is a bit shifted with some value. Run test command to see gas difference.

```
·-------------------------------|----------------------------|-------------|-----------------------------·
|     Solc version: 0.8.20      ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
································|····························|·············|······························
|  Methods                                                                                               │
···············|················|··············|·············|·············|···············|··············
|  Contract    ·  Method        ·  Min         ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
···············|················|··············|·············|·············|···············|··············
|  ACBit       ·  grantRole     ·       32244  ·      49344  ·      37944  ·           12  ·          -  │
···············|················|··············|·············|·············|···············|··············
|  ACBit       ·  renounceRole  ·           -  ·          -  ·      24401  ·            1  ·          -  │
···············|················|··············|·············|·············|···············|··············
|  ACBit       ·  revokeRole    ·       27428  ·      32228  ·      29028  ·            3  ·          -  │
···············|················|··············|·············|·············|···············|··············
|  ACOriginal  ·  grantRole     ·       51696  ·      52080  ·      51888  ·            4  ·          -  │
···············|················|··············|·············|·············|···············|··············
|  ACOriginal  ·  renounceRole  ·           -  ·          -  ·      25097  ·            1  ·          -  │
···············|················|··············|·············|·············|···············|··············
|  ACOriginal  ·  revokeRole    ·       29798  ·      30182  ·      30054  ·            3  ·          -  │

```

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
```
