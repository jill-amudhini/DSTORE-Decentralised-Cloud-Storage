import React from "react";
import Navbar from "./../../components/NavBar/NavBar";
import Table from "./Table";
import ipfs from './../../assets/ipfs'
import CryptoJS from "crypto-js";

class StoreHouse extends React.Component {

  state = { web3: null, accounts: null, buffer: null, ipfsHash: '', tableData: null };

  constructor(props) {
    super(props);
    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      account: null,
      tableData: [
        { 'File Name': 'Apple', 'File Type': 'PNG', 'Size': 100, 'Upload date': 50 },
        { 'File Name': 'Apple', 'File Type': 'PNG', 'Size': 100, 'Upload date': 50 },
        { 'File Name': 'Apple', 'File Type': 'PNG', 'Size': 100, 'Upload date': 50 },
        { 'File Name': 'Apple', 'File Type': 'PNG', 'Size': 100, 'Upload date': 50 },
        { 'File Name': 'Apple', 'File Type': 'PNG', 'Size': 100, 'Upload date': 50 },
        { 'File Name': 'Apple', 'File Type': 'PNG', 'Size': 100, 'Upload date': 50 }
      ]
    }

  }

  convertWordArrayToUint8Array(wordArray) {
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
    return uInt8Array;
  }


  captureFile(event) {
    console.log('capture file..')
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    var key, wordArray, encrypted;
    reader.onload = () => {
      console.log(reader.result);
      key = "123456789";
      // Convert: ArrayBuffer -> WordArray
      wordArray = CryptoJS.lib.WordArray.create(reader.result);
      // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)         
      encrypted = CryptoJS.AES.encrypt(wordArray, key).toString();

      //console.log(encrypted)

      var ipfshash;

      ipfs.files.add(Buffer(encrypted), (error, result) => {
        if (error) {
          console.log("Error hey")
          console.error(error)
          return
        }
        //this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
        //return 
        //this.setState({ ipfsHash: result[0].hash })
        ipfshash = result[0].hash;
        console.log('ifpsHash', result[0].hash)
        //})

        console.log("Get ipfs file")
        ipfs.files.get(ipfshash, (error, file1) => {
          if (error) {
            console.log("I Error d")
            console.error(error)
            return
          }
          //this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
          //return 
          //this.setState({ ipfsHash: result[0].hash })
          console.log(file1);
          //})

          //console.log("File content >> ", file[0].content.toString('utf8'))

          //Decryption
          // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
          var decrypted = CryptoJS.AES.decrypt(file1[0].content, "abcdefg");
          console.log(decrypted)

          // Convert: WordArray -> typed array
          //var typedArray = this.convertWordArrayToUint8Array(decrypted);

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
          var typedArray = uInt8Array;


          // Create blob from typed array
          var fileDec = new Blob([typedArray]);

          var a = document.createElement("a");
          var url = window.URL.createObjectURL(fileDec);
          var filename = "newpdf.png";
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);

        })

      })



      console.log("Decrypt");

      // ipfs.files.get(ipfshash, (error, file) => {
      //   if (error) {
      //     console.log("Error d")
      //     console.error(error)
      //     return
      //   }
      //   //this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
      //   //return 
      //   //this.setState({ ipfsHash: result[0].hash })
      //   console.log(file);
      //   //})
      // })

      // var dreader = new FileReader();
      // dreader.readAsArrayBuffer(fileEnc);
      // console.log(dreader.result);




    }

    /*ipfs.files.add(encrypted, (error, result) => {
      if (error) {
        console.error(error)
        return
      }
      //this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
      //return 
      //this.setState({ ipfsHash: result[0].hash })
      console.log('ifpsHash', result[0].hash)
      //})
    })*/





  }

  onFileSubmit(event) {
    event.preventDefault()
    //console.log('on submit...')
    ipfs.files.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error(error)
        return
      }
      //this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
      //return 
      this.setState({ ipfsHash: result[0].hash })
      console.log('ifpsHash', this.state.ipfsHash)
      //})
    })
  }

  render() {
    return (
      <div className="StoreHouse">
        <Navbar />
        <h1 className="StoreHouse">StoreHouse</h1>
        Hello, React
        <br /> Table 1 data
        <Table data={this.state.tableData} />
        <br /><br />
        <form onSubmit={this.onFileSubmit} >
          <input type='file' onChange={this.captureFile} />
          <input type='submit' />
        </form>

      </div>

    );
  }
}

export default StoreHouse;