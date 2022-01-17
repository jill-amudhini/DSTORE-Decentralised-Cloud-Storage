// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21;
pragma experimental ABIEncoderV2;

contract LoginInfo {

    struct userStruct {
      string username;
      string email;
    }

    mapping (address => userStruct) public userMapping;

    function registerUser(address _usraddr, string memory name, string memory email) public 
    {
        userMapping[_usraddr]=userStruct(name,email);
    }

    function getUser(address _usraddr) public view returns (userStruct memory _userStruct) {
        return userMapping[_usraddr];
    }

}