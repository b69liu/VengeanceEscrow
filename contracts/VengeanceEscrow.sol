// SPDX-License-Identifier: MIT


pragma solidity ^0.8.1;

contract VengeanceEscrow{
    address public buyer;
    address public seller;
    address public agent;
    uint256 public PRICE;
    enum State {Paying, Deliever, Done}
    State state;
    mapping(address=>uint256) public refundableBalance;
    
    
    constructor(address agent_,address buyer_, address seller_, uint256 price_){
        buyer = buyer_;
        seller = seller_;
        agent = agent_;
        PRICE = price_;
        state = State.Paying;
    }
    
    modifier buyerOnly(){
        require(msg.sender == buyer, "Only buyer can operate.");
        _;
    }
    
    modifier sellerOnly(){
        require(msg.sender == seller, "Only seller can operate.");
        _;
    }
    
    modifier agentOnly(){
        require(msg.sender == agent, "Only agent can operate.");
        _;
    }
    
    modifier onState(State allowedState){
        require(state == allowedState, "Invalid state.");
        _;
    }
    
    function buyerPay() payable public buyerOnly onState(State.Paying){
        uint256 buyperPayment =  PRICE + (PRICE / 2);
        require(msg.value >= buyperPayment, "Buyer should deposite 1.5 times PRICE.");
        refundableBalance[msg.sender] +=  msg.value;
    }
    
    function sellerPay() payable public sellerOnly onState(State.Paying){
        uint256 sellerPayment =  PRICE;
        require(msg.value >= sellerPayment, "Seller shoud deposite as much as PRICE.");
        refundableBalance[msg.sender] += msg.value;
    }
    
    function withDrawAll() payable public {
        require(refundableBalance[msg.sender] > 0, "No enough balance.");
        uint256 currentBalance = refundableBalance[msg.sender];
        refundableBalance[msg.sender] = 0;
        payable(msg.sender).transfer(currentBalance);
    }
    
    // after both sides have paid enough, they can start to deliever goods.
    function finishPayment() public onState(State.Paying){
        uint256 buyperPayment =  PRICE + (PRICE / 2);
        uint256 sellerPayment =  PRICE ;
        require(state == State.Paying, "Much be in Paying state.");
        require(refundableBalance[buyer] >= buyperPayment, "Buyer not pay enough.");
        require(refundableBalance[seller] >= sellerPayment, "Seller not pay enough.");
        refundableBalance[buyer] -= buyperPayment;
        refundableBalance[seller] -= sellerPayment;
        state = State.Deliever;
    }
    
    // buyer should confirm the deliver after receive goods
    function confirmDeliver() public buyerOnly onState(State.Deliever){
        // buyer pay 10% service fee
        refundableBalance[buyer] += (PRICE / 2) - (PRICE / 10);
        refundableBalance[seller] += PRICE;
        refundableBalance[agent] += (PRICE / 10);
        state = State.Done;
    }
    
    function destory() public payable agentOnly onState(State.Done){
        require(refundableBalance[buyer] == 0, "Buyer has balance not claim.");
        require(refundableBalance[seller] == 0, "Seller has balance not claim.");
        selfdestruct(payable(agent));
    }
    
    
}

contract VengeanceEscrowFactory {
    // creator needs to give the contract name
    mapping(address => mapping(string => VengeanceEscrow)) escrows;
    
    function createContract(string calldata name, address buyer, address seller, uint256 price) public{
        require(escrows[msg.sender][name] == VengeanceEscrow(address(0)), "A contract with this name has existed.");
        escrows[msg.sender][name] = new VengeanceEscrow(msg.sender, buyer, seller, price);
    }

    function getMyEscrow(string calldata name) public view returns(VengeanceEscrow){
        return escrows[msg.sender][name];
    }


}