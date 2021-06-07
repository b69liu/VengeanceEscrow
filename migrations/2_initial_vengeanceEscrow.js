const VengeanceEscrowFactory = artifacts.require("VengeanceEscrowFactory");

module.exports = function (deployer) {
  deployer.deploy(VengeanceEscrowFactory);
};
