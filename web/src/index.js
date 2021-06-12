
import {join} from 'lodash';
import './style.css';
import ConfirmIcon from './confirm.png';
import {EthController} from "./EthController.js"; 

const controller = new EthController()

function component() {
    const element = document.createElement('div');
    
    // const myIcon = new Image();
    // myIcon.src = ConfirmIcon;
    // element.appendChild(myIcon);
    
    const ethereumButton = document.createElement('button');
    ethereumButton.innerHTML = 'Connect MetaMask Account';
    ethereumButton.classList.add('enableEthereumButton');

    ethereumButton.onclick = controller.enableMetaMask;
    element.appendChild(ethereumButton);

    return element;
  }
  
  document.body.prepend(component());

// //   connect wallet
//   let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    addListenersToDom();
  }

  function addListenersToDom(){
    initEscrowAddressListener();
    initEscrowSearchListener();
    initCreateContractListener();
    initCreateContractListener();
    initGetPriceListener();
    initGetBalanceListener();
    initBuyerPayListener();
    initSellerPayListener();
    initFinishPaymentListener();
    initConfirmDeliveryListener();
    initDestoryListener();
  }

  function initEscrowAddressListener(){
    const btn = document.getElementById("escrowContractAddressBtn");
    btn.addEventListener("click", ()=>{
      const input = document.getElementById("escrowContractAddress");
      const address = input.value;
      if(!address){
        console.log("Escrow address is empty!");
        return;
      }
      controller.setVengeanceEscrow(address);
    });
  }

  function initEscrowSearchListener(){
    const btn = document.getElementById("escrowSearchNameBtn");
    btn.addEventListener("click", async ()=>{
      const input = document.getElementById("escrowSearchName");
      const name = input.value;
      if(!name){
        console.log("Escrow name is empty!");
        return;
      }
      const myEscrowAddress = await controller.getMyEscrow(name);
      document.getElementById("escrowSearchResult").innerText = myEscrowAddress;
    });
  }

  function initCreateContractListener(){
    const btn = document.getElementById("createEscrowContractBtn");
    btn.addEventListener("click", async ()=>{
      const contractName = document.getElementById("newContractName").value;
      const buyer = document.getElementById("newContractBuyer").value;
      const seller = document.getElementById("newContractSeller").value;
      const price = document.getElementById("newContractPrice").value;
      if(!(contractName && buyer && seller && price)){
        console.log('Incompleted data.');
        return;
      }
      controller.createContract(contractName, buyer, seller, price);
    });
  }

  function initGetPriceListener(){
    const btn = document.getElementById("escrowGetPriceBtn");
    btn.addEventListener("click", async ()=>{
      const price = await controller.getPrice();
      document.getElementById("escrowPriceResult").innerText = price;
      document.getElementById("buyerNeedToPay").innerText = parseInt(price) * 1.5;
      document.getElementById("sellerNeedToPay").innerText = parseInt(price);
    });
  }

  function initGetBalanceListener(){
    const btn = document.getElementById("refundableBalanceBtn");
    btn.addEventListener("click", async ()=>{
      const balance = await controller.getMyRefundableBalance();
      document.getElementById("refundableBalanceResult").innerText = balance;
    });
    // Withdraw All button listener
    const withdrawAllBtn = document.getElementById("withdrawAllBtn");
    withdrawAllBtn.addEventListener("click", async ()=>{
      await controller.withdrawAll();
    });

  }

  function initBuyerPayListener(){
    const btn = document.getElementById("buyerPayBtn");
    btn.addEventListener("click", async ()=>{
      const amount = document.getElementById("buyerPay").value;
      if(!amount){
        console.log("Please enter amount to pay.");
        return;
      }
      const result = await controller.buyerPay(amount);
      console.log(result);
    });
  }

  function initSellerPayListener(){
    const btn = document.getElementById("sellerPayBtn");
    btn.addEventListener("click", async ()=>{
      const amount = document.getElementById("sellerPay").value;
      if(!amount){
        console.log("Please enter amount to pay.");
        return;
      }
      const result = await controller.sellerPay(amount);
      console.log(result);
    });
  }

  function initFinishPaymentListener(){
    const btn = document.getElementById("finishPayment");
    btn.addEventListener("click", async ()=>{
      controller.finishPayment();
    });
  }

  function initConfirmDeliveryListener(){
    const btn = document.getElementById("confirmDelivery");
    btn.addEventListener("click", async ()=>{
      controller.confirmDeliver();
    });
  }

  function initDestoryListener(){
    const btn = document.getElementById("destoryContract");
    btn.addEventListener("click", async ()=>{
      controller.destory();
    });
  }

  