import { ethers } from "ethers";
import  VengeanceEscrowAbi from "./abis/VengeanceEscrowAbi.json"
import  VengeanceEscrowFactoryAbi from "./abis/VengeanceEscrowFactoryAbi.json"


export class EthController {

    VengeanceEscrow = null;
    VengeanceEscrowFactory = null;
    signer = null;
    provider = null;


    enableMetaMask = async() =>{
        // this.accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        // await window.ethereum.enable()
        window.ethereum.request({ method: 'eth_requestAccounts' });
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        console.log("enabled MetaMask", this.signer.address);
        this.setVengeanceEscrowFactory();
    }
    
    setVengeanceEscrowFactory = (address="0x247adc5B0BDf0Ecf6Fdd2744336F9ba88b5A6632") => {
        if(! this.signer){
            console.log("Please connect to Metamask.");
            return;
        }
        const VengeanceEscrowFactoryNotSigned =  new ethers.Contract( address , VengeanceEscrowFactoryAbi, this.provider);
        this.VengeanceEscrowFactory = VengeanceEscrowFactoryNotSigned.connect(this.signer);

        console.log("Factory connected", this.signer);
    }

    setVengeanceEscrow = (address) => {
        if(! this.signer){
            console.log("Please connect to Metamask.");
            return;
        }
        const VengeanceEscrowNotSigned =  new ethers.Contract( address , VengeanceEscrowAbi, this.provider);
        this.VengeanceEscrow = VengeanceEscrowNotSigned.connect(this.signer);
        console.log(this.VengeanceEscrow);
    }

    createContract = async (escrowName, buyer, seller, price) => {
        if(! this.VengeanceEscrowFactory){
            console.log("Please set VengeanceEscrowFactory.");
            return;
        }
        let result = await this.VengeanceEscrowFactory.createContract(escrowName, buyer, seller, price);
        console.log(result);

    }

    getMyEscrow = async (escrowName) => {
        let escrowAddress = await this.VengeanceEscrowFactory.getMyEscrow(escrowName);
        return escrowAddress;
    }


    getPrice = async () => {
        if(! this.VengeanceEscrow){
            console.log("Please Link VengeanceEscrow.");
            return;
        }
        let result = await this.VengeanceEscrow.PRICE();
        console.log(result);
        return result;
    }
    
    getMyRefundableBalance = async () => {
        if(! this.VengeanceEscrow){
            console.log("Please Link VengeanceEscrow.");
            return;
        }
        const address = await this.signer.getAddress();
        let result = await this.VengeanceEscrow.refundableBalance(address);
        console.log(result);
        return result;
    }
    
    buyerPay = async (amount) => {
        if(! this.VengeanceEscrow){
            console.log("Please Link VengeanceEscrow.");
            return;
        }
        let result = await this.VengeanceEscrow.buyerPay({value: amount});
        console.log(result);
    }

    sellerPay = async (amount) => {
        if(! this.VengeanceEscrow){
            console.log("Please Link VengeanceEscrow.");
            return;
        }
        let result = await this.VengeanceEscrow.sellerPay({value: amount});
        console.log(result);
    }

    withdrawAll = async () => {
        if(! this.VengeanceEscrow){
            console.log("Please Link VengeanceEscrow.");
            return;
        }
        let result = await this.VengeanceEscrow.withDrawAll();
        console.log(result);
    }

    finishPayment = async () => {
        if(! this.VengeanceEscrow){
            console.log("Please Link VengeanceEscrow.");
            return;
        }
        let result = await this.VengeanceEscrow.finishPayment();
        console.log(result);
    }

    confirmDeliver = async () => {
        if(! this.VengeanceEscrow){
            console.log("Please Link VengeanceEscrow.");
            return;
        }
        let result = await this.VengeanceEscrow.confirmDeliver();
        console.log(result);
    }

    destory = async () => {
        if(! this.VengeanceEscrow){
            console.log("Please Link VengeanceEscrow.");
            return;
        }
        let result = await this.VengeanceEscrow.destory();
        console.log(result);
    }
    



}