import { mnemonicToWalletKey } from '@ton/crypto';
import { Address } from '@ton/core';
import { WalletContractV4 } from '@ton/ton';

const mnemonic = [
  "fiction", "wheel", "praise", "robot", "never", "voyage", "return", "author", "very",
  "cook", "exist", "supply", "cloth", "gather", "extra", "suffer", "movie", "current",
  "wait", "machine", "stamp", "cost", "marble", "december"
];

async function main() {
  const key = await mnemonicToWalletKey(mnemonic);

  // Wallet V4 - Workchain 0
  const wallet = WalletContractV4.create({
    workchain: 0,
    publicKey: key.publicKey,
  });

  const address = wallet.address;

  console.log("Generated TON Address (Bounceable):", address.toString({ bounceable: true }));
  console.log("Generated TON Address (Non-Bounceable):", address.toString({ bounceable: false }));

  // So sánh với địa chỉ bạn đã gửi token tới
  const target = "UQBMGGoqRXpf8u5xzOylY7cR2z8wBK3doWRA-tDIKi61QUwB";

  if (address.toString({ bounceable: false }) === target) {
    console.log("==> Địa chỉ khớp với nơi bạn đã gửi USDT!");
  } else {
    console.log("==> KHÔNG KHỚP. Có thể bạn cần đổi derivation path hoặc đang dùng ví khác.");
  }
}

main();
