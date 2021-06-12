# VengeanceEscrow

A dapp to offer escrow for buyer and seller.

This project utilizes the game theory to introduce the punishment mechanism in order to force both parties to reach the same goal.

Parties:
1. Buyer: who wants to buy products and willing to pay.
2. Seller: who wants to sell products for money.
3. The agent: who deploys this contract, and will later receive 10% of services fee. Buyer can also be the agent.

Procedure:

1. Buyer and seller want to make a deal.
2. Agent deploys this contract with factory and tell the address to buyer and seller.
3. Buyer send 1.5 * PRICE to the contract and part of it as collateral.
4. Seller send 1 * PRICE to the contract as collateral.
5. Buyer receives the goods in real world.
6. If buyer get the good, the buyer call the 'confirmDeliver' function, and then all parties get the money they desierves.
7. If the buyer didn't receive the goods, the buyer just does nothing untill the buyer receives. So both buyer and seller can not collateral money back.

In the step 7 scenario, the buyer has to options, call 'confirmDeliver' without goods received, or not call. If the buyer calls, the buyer may forever loss the chance to get the goods and the oppotunity to punish the seller, but instead the buyer will get 0.5 * PRICE back. However, if the buyer waits, he may lose nothing, because the money is still holding in the contract. To optimize the utilities, the buyer may wait forever, and the seller knows this. So the seller has no incentive to cheat.

## License
[MIT](https://choosealicense.com/licenses/mit/)