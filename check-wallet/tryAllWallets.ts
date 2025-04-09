import { mnemonicToWalletKey } from '@ton/crypto';
import { Address } from '@ton/core';
import {
  WalletContractV4,
  WalletContractV5R1,
  WalletContractV2R1,
  WalletContractV2R2,
} from '@ton/ton';

const mnemonic = [
  "fiction", "wheel", "praise", "robot", "never", "voyage", "return", "author", "very",
  "cook", "exist", "supply", "cloth", "gather", "extra", "suffer", "movie", "current",
  "wait", "machine", "stamp", "cost", "marble", "december"
];

const target = 'UQBMGGoqRXpf8u5xzOylY7cR2z8wBK3doWRA-tDIKi61QUwB';

async function main() {
  const keyPair = await mnemonicToWalletKey(mnemonic);

  const wallets = [
    { name: 'Wallet V4', ctor: WalletContractV4 },
    { name: 'Wallet V5R1', ctor: WalletContractV5R1 },
    { name: 'Wallet V2R1', ctor: WalletContractV2R1 },
    { name: 'Wallet V2R2', ctor: WalletContractV2R2 },
  ];

  for (const { name, ctor } of wallets) {
    const wallet = ctor.create({
      workchain: 0,
      publicKey: keyPair.publicKey,
    });

    const addr = wallet.address.toString({ bounceable: false });

    console.log(`${name} address (non-bounceable): ${addr}`);

    if (addr === target) {
      console.log(`==> TÌM ĐƯỢC! Loại ví là: ${name}`);
      return;
    }
  }

  console.log('==> KHÔNG khớp với bất kỳ ví phổ biến nào. Có thể bạn dùng ví tùy chỉnh hoặc derivation path lạ.');
}

main();
