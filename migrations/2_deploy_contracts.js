var LoginInfo = artifacts.require("./LoginInfo.sol");
var CloudStorage = artifacts.require("./CloudStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(LoginInfo);
  deployer.deploy(CloudStorage);
};
