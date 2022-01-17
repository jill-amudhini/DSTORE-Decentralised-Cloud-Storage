// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21;
pragma experimental ABIEncoderV2;

contract CloudStorage {
    struct fileInfo {
      string filename;
      string filesize;
      uint256 uploaddate;
      string ipfshash;
      bool shared;
    }

    mapping (address => fileInfo[]) public fileMapping;

    function addFile(string memory filename, string memory filesize, uint256 uploaddate, string memory ipfshash) public 
    {
        fileMapping[msg.sender].push(fileInfo(filename,filesize,uploaddate,ipfshash,false));
    }

    function getFiles(address _usraddr) public view returns (fileInfo [] memory) {
        return fileMapping[_usraddr];
    }

    function shareFile(address _toaddr, string memory filename, string memory filesize, uint256 uploaddate, string memory ipfshash) public
    {
        fileMapping[_toaddr].push(fileInfo(filename,filesize,uploaddate,ipfshash,true));
    }
}
