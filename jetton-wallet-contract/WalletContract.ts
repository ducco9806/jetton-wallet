import { mnemonicToWalletKey } from '@ton/crypto';
import { Address } from "@ton/core";
import { WalletContractV4, JettonMaster, JettonWallet } from '@ton/ton';

// ===== THAY THÔNG TIN NÀY =====
const mnemonic = ['fiction', 'wheel', 'praise', 'robot', 'never', 'voyage', 'return', 'author', 'very',
    'cook', 'exist', 'supply', 'cloth', 'gather', 'extra', 'suffer', 'movie', 'current',
    'wait', 'machine', 'stamp', 'cost', 'marble', 'december'];
const jettonMasterAddress = Address.parse('EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'); // Địa chỉ Jetton USDT chính xác

async function main() {
  const key = await mnemonicToWalletKey(mnemonic);

  const wallet = WalletContractV4.create({
    workchain: 0,
    publicKey: key.publicKey,
  });

  const userAddress = wallet.address;

  const jettonWalletAddress = Address.parseRaw(
    `${jettonMasterAddress.toString()}:${userAddress.toString()}`
  );

  console.log("Jetton Wallet Address (USDT):", jettonWalletAddress.toString({ bounceable: false }));
}

main();
