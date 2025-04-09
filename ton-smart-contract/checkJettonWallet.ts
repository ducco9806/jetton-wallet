import { mnemonicToWalletKey } from '@ton/crypto';
import { TonClient, WalletContractV4 } from '@ton/ton';
import { Address } from '@ton/core';
import { JettonMaster } from '@ton/ton';

const mnemonic = [
  "fiction", "wheel", "praise", "robot", "never", "voyage", "return", "author", "very", "cook", "exist",
  "supply", "cloth", "gather", "extra", "suffer", "movie", "current", "wait", "machine", "stamp", "cost", "marble", "december"
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

  const userAddress = wallet.address;

  const jettonMasterAddress = Address.parse('EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs');

  const jettonMaster = client.open(JettonMaster.create(jettonMasterAddress));
  const jettonWalletAddress = await jettonMaster.getWalletAddress(userAddress);

  console.log('Địa chỉ ví bạn:', userAddress.toString());
  console.log('Địa chỉ JettonWallet (USDT):', jettonWalletAddress.toString());
}

main();