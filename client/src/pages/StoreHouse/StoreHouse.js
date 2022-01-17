import React from "react";
import Navbar from "./../../components/NavBar/NavBar";
import Table from "./Table";
import ipfs from './../../assets/ipfs'
import CryptoJS from "crypto-js";
import { Button } from 'antd';
import DropFileInput from './drop-file-input/DropFileInput';
import "./StoreHouse.css"

import getWeb3 from "./../../getWeb3";
import CloudStorageContract from "./../../contracts/CloudStorage.json";

let web3 = null;

class StoreHouse extends React.Component {

  state = {
    web3: null, accounts: null, loading: false, buffer: null, tableData: null,
    isOpen: false, filesToUpload: [], storagecontract: null
  };


  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      buffer: null,
      account: null,
      tableData: [{ 'File Name': '', 'File Type': '', 'Size': '', 'Upload date': '', 'Action': '' }]
    }
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      web3 = await getWeb3();
      // // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CloudStorageContract.networks[networkId];

      const instance = new web3.eth.Contract(
        CloudStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, storagecontract: instance });

      let currentComponent = this;
      //Get uploaded files
      instance.methods.getFiles(accounts[0]).call()
        .then(function (response) {
          if (response.length !== 0) {
            let file, fileData = [{ 'File Name': '', 'File Type': '', 'Size': '', 'Upload date': '', 'Action': '' }];
            var fname, ftype, fsize, fhash, fdate, fupdate, sharefile;
            for (var i = 0; i < response.length; i++) {

              fname = response[i]['filename']
              ftype = fname.split(".").slice(-1)
              ftype = ftype.toString().toUpperCase()
              fsize = response[i]['filesize'] + "B"
              fhash = response[i]['ipfshash']
              fdate = response[i]['uploaddate']
              fdate = new Date(fdate * 1000);
              fupdate = fdate.getDate() + "-" + (fdate.getMonth() + 1) + "-" + fdate.getFullYear();
              console.log(fname, fhash)

              sharefile = [fname, response[i]['filesize'], fhash]
              file = {
                'File Name': fname, 'File Type': ftype, 'Size': fsize, 'Upload date': fupdate,
                'Action': <div>
                  <Button size="small" className="btn-hover" type="primary" onClick={() => currentComponent.handleDownload(fname, fhash)}>Download</Button>
                  &nbsp;&nbsp;
                  <Button size="small" className="btn-hover" type="primary" onClick={() => currentComponent.handleShare(sharefile)}>Share</Button>
                </div>
              }

              fileData.push(file);
            }
            currentComponent.setState({ tableData: fileData })
            console.log("Table", currentComponent.state.tableData)
          }
        })


    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // toggleModal = async () => {
  //   this.isOpen = !this.isOpen;
  // }

  //addFile(bytes32 filename, bytes32 filesize, uint256 uploaddate, bytes32 ipfshash)
  addNewFile = async (filename, filesize, uploaddate, ipfshash) => {
    const contract = this.state.storagecontract;
    const metamaskAddr = this.state.accounts[0];

    await contract.methods.addFile(filename, filesize.toString(),
      Math.floor(uploaddate), ipfshash).send({ from: metamaskAddr })

    window.location.reload();
  }


  onFileChange(files) {
    console.log(files);
    this.filesToUpload = files;
  }

  onUploadSubmit = async () => {
    var file, password, reader, wordArray, encrypted, ipfshash;
    if (this.filesToUpload !== []) {
      for (var i = 0; i < this.filesToUpload.length; i++) {

        file = this.filesToUpload[i]
        password = prompt("Enter password for " + file['name'])
        if (password == null)
          return
        console.log(file['name'], password)
        reader = new window.FileReader()
        reader.readAsArrayBuffer(file)

        reader.onload = () => {
          console.log(reader.result);
          // Convert: ArrayBuffer -> WordArray
          wordArray = CryptoJS.lib.WordArray.create(reader.result);
          // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)         
          encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();

          ipfs.files.add(Buffer(encrypted), (error, result) => {
            if (error) {
              console.error(error)
              return
            }

            ipfshash = result[0].hash
            console.log('ifpsHash', result[0].hash)

            var date = (new Date()).getTime();
            var dateUnixTimestamp = date / 1000;
            console.log(file['name'], file['size'], date, dateUnixTimestamp, ipfshash)

            this.addNewFile(file['name'], file['size'], dateUnixTimestamp, ipfshash)
          })

        }
      }
    }
    else {
      alert("Select files to upload")
    }
  }


  handleShare = async (file) => {
    var address = prompt("Enter address of the user receiving " + file[0])
    if (address == null)
      return

    try {
      //shareFile(address _toaddr, string memory filename, string memory filesize, uint256 uploaddate, string memory ipfshash)
      const contract = this.state.storagecontract;
      const metamaskAddr = this.state.accounts[0];

      var date = (new Date()).getTime();
      var dateUnixTimestamp = date / 1000;

      await contract.methods.shareFile(address, file[0], file[1],
        Math.floor(dateUnixTimestamp), file[2]).send({ from: metamaskAddr })

      alert("File sent to " + address)

    }
    catch (error) {
      alert("Invalid metamask address" + error)
      return;
    }

  }


  handleDownload = async (fname, fhash) => {
    let password = prompt("Enter password for " + fname)
    if (password == null)
      return
    ipfs.files.get(fhash, function (err, files) {
      files.forEach(function callback(file) {
        console.log(file.path)
        console.log("File content >> ", file.content.toString('utf8'))
        var decrypted = CryptoJS.AES.decrypt(file.content.toString('utf8'), password);
        console.log(decrypted);
        let wordArray = decrypted;
        var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
        var length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4;
        var uInt8Array = new Uint8Array(length), index = 0, word, i;
        for (i = 0; i < length; i++) {
          word = arrayOfWords[i];
          uInt8Array[index++] = word >> 24;
          uInt8Array[index++] = (word >> 16) & 0xff;
          uInt8Array[index++] = (word >> 8) & 0xff;
          uInt8Array[index++] = word & 0xff;
        }
        let typedArray = uInt8Array;
        console.log(typedArray);
        var downloadBlob = function (data, fileName, mimeType) {
          var blob, url;
          blob = new Blob([data], {
            type: mimeType
          });
          url = window.URL.createObjectURL(blob);
          downloadURL(url, fileName);
          setTimeout(function () {
            return window.URL.revokeObjectURL(url);
          }, 1000);
        };
        var downloadURL = function (data, fileName) {
          var a;
          a = document.createElement('a');
          a.href = data;
          a.download = fileName;
          document.body.appendChild(a);
          a.style = 'display: none';
          a.click();
          a.remove();
        };
        downloadBlob(typedArray, `${fname}`);

      })
    })
    this.setState({
      visiblepd: false,
      confirmLoadingpd: false,

    });

  }

  render() {

    return (
      <div className="StoreHouse">
        <Navbar />
        {/*<h1 className="StoreHouse">Uploaded Files</h1>*/}
        <br /><br />
        <div className="FileTable">
          <Table data={this.state.tableData} />
        </div>

        <br /><br />

        <div className="upload_box">
          <DropFileInput
            onFileChange={(files) => this.onFileChange(files)}
            onUploadSubmit={(files) => this.onUploadSubmit()}
          />
        </div>

      </div>

    );
  }
}

export default StoreHouse;