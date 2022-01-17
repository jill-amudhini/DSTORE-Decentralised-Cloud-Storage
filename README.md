# DSTORE-Decentralised-Cloud-Storage

## <b>Abstract</b>

Cloud storage has become a prominent study area as a result of the vast amount of data produced every day. The current centralised cloud storage system has several disadvantages, 
including high operational costs, data availability, and data security. Blockchain presents a decentralised approach to resolving such issues. By combining the cloud and blockchain technologies, the storage solution is made secure and scalable. The major goal is to create a system that takes advantage of the security of cloud-based data and applies it to the blockchain. It enables users to save data to the cloud and includes a conspicuous access control mechanism to maintain data privacy. Without valid permission, no third party will be able to view the data since it is encrypted and stored in distinct nodes. This will improve the security of existing cloud storage and reduce data breaches and other assaults. This project proposes a blockchain based cloud storage system in which data is divided into multiple pieces that are encrypted and linked using a hashing mechanism. The IPFS (Interplanetary File System) protocol distributes file portions throughout a peer-to-peer network of computers, allowing for decentralised storage of the file.

## <b>Proposed Architecture</b>

<p align="center"><img src="https://github.com/jill-amudhini/DSTORE-Decentralised-Cloud-Storage/blob/main/Screenshots/SystemArchitecture.png" width=75% height=75%></p>

## <b>Tools and Technology</b>
- Ethereum
- Solidity
- Truffle
- Ganache
- Metamask
- React JS
- Html
- CSS
- VSCode


## <b>Steps to run in Localhost</b>

Install the dependencies
```sh
cd client
npm install
```
Compile and Migrate the smart contracts
```sh
cd ..
truffle compile
truffle migrate
```
Start the Server
```sh
cd client
npm start
```

## <b>Screenshots</b>

### Home Page
<p align="center"><img src="https://github.com/jill-amudhini/DSTORE-Decentralised-Cloud-Storage/blob/main/Screenshots/HomePage.png" width=80% height=80%></p>

### Login Page
<p align="center"><img src="https://github.com/jill-amudhini/DSTORE-Decentralised-Cloud-Storage/blob/main/Screenshots/LoginPage.png" width=80% height=80%></p>

### Dashboard
<p align="center"><img src="https://github.com/jill-amudhini/DSTORE-Decentralised-Cloud-Storage/blob/main/Screenshots/Dashboard.png" width=80% height=80%></p>

### File Upload Page
<p align="center"><img src="https://github.com/jill-amudhini/DSTORE-Decentralised-Cloud-Storage/blob/main/Screenshots/FileUploadPage.png" width=80% height=80%></p>

### Contact Us Page
<p align="center"><img src="https://github.com/jill-amudhini/DSTORE-Decentralised-Cloud-Storage/blob/main/Screenshots/ContactUsPage.png" width=80% height=80%></p>

## <b>Conclusion</b>
The proposed system enhances the security of data by encrypting and distributing the data across multiple peers in the system. The implemented system encrypts data using the AES 256 bit encryption technique, assuring the privacy of the user's data. The IPFS protocol is then used to distribute and store encrypted data among network peers. The system not only addresses the privacy and security issues associated with centralized cloud storage, but also provides a platform for peers to rent out underused storage and earn cryptocurrency in exchange, increasing storage resource usage.

