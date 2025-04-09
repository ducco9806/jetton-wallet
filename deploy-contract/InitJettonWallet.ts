import { mnemonicToWalletKey } from '@ton/crypto';
import { TonClient, WalletContractV4, internal, toNano } from '@ton/ton';
import { Address } from '@ton/core';
import { JettonWallet, JettonMaster } from '@ton/ton';

const mnemonic = [
  "fiction", "wheel", "praise", "robot", "never", "voyage", "return", "author",
  "very", "cook", "exist", "supply", "cloth", "gather", "extra", "suffer", "movie",
  "current", "wait", "machine", "stamp", "cost", "marble", "december"
];

async function main() {
  const client = new TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
  });

  const keyPair = await mnemonicToWalletKey(mnemonic);

  const wallet = WalletContractV4.create({
    workchain: 0,
    publicKey: keyPair.publicKey,
  });

  const walletContract = client.open(wallet);

  // Địa chỉ Jetton Master (USDT trên mạng chính)
  const jettonMasterAddress = Address.parse('EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs');

  // Địa chỉ JettonWallet của bạn (đã được kiểm tra là đúng)
  const myJettonWallet = Address.parse('EQCh0ko_eq0hHZYoddnQIPquctr6mcEULy0DkEcCaG5d4BOc');

  // Gửi 0.05 TON để khởi tạo JettonWallet
  await walletContract.sendTransfer({
    secretKey: keyPair.secretKey,
    seqno: await walletContract.getSeqno(),
    messages: [
      internal({
        to: myJettonWallet,
        value: toNano('0.05'),
        body: '',
      }),
    ],
  });

  console.log('Đã gửi TON để khởi tạo ví JettonWallet');
}

main();
