import { ethers } from 'ethers';
import json from './Vote.json';
import config from '../config';

class Eth {
  init(privateKey) {
    let wallet = this.initWallet(privateKey);
    let provider = this.initProvider();

    this.wallet = wallet.connect(provider);
    this.provider = provider;
    this.contract = this.initContract(this.wallet, this.provider);
  }

  initWallet(privateKey) {
    let wallet = new ethers.Wallet(privateKey);
    return wallet;
  }

  initProvider() {
    let provider;

    if (config.env === 'test') {
      provider = ethers.getDefaultProvider(config.testProvider);
    } else if (config.env === 'dev') {
      provider = new ethers.providers.JsonRpcProvider(config.devProvider);
    }

    return provider;
  }

  initContract(wallet, provider) {
    let contract = new ethers.Contract(config.contractAddress, json.abi, provider);
    let contractWithSigner = contract.connect(wallet);

    return contractWithSigner;
  }
}

// let balance = await activeWallet.getBalance();
// let val = await contractWithSigner.votes();
// {value: utils.parseEther('1.0')}
// let cba = await contractWithSigner.getBalance();
// console.log(balance.toString() / 1000000000000000000);
// console.log('vote:' + cba / 1000000000000000000);

export default Eth;
