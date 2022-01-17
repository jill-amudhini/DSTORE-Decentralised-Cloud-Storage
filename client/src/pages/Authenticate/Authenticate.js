import React, { Component,useState } from 'react';
import { Navigate } from "react-router-dom";
import LoginInfoContract from "./../../contracts/LoginInfo.json";
import getWeb3 from "./../../getWeb3";
import "./Authenticate.css";
//import { withNavigation } from 'react-navigation';

let web3 = null; // Will hold the web3 instance

class Authenticate extends Component {
  state = { web3: null, accounts: null, logincontract: null, loading: false, isaddr: "" };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      web3 = await getWeb3();
      // // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LoginInfoContract.networks[networkId];
      const instance = new web3.eth.Contract(
        LoginInfoContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, logincontract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handlesignIn = async () => {
    const metamaskAddr = this.state.accounts[0];
    console.log(metamaskAddr)
    const contract = this.state.logincontract;

    //Verify MetaMask account holder
    const nonce = Math.floor(Math.random() * 10000);
    var message = web3.utils.fromUtf8("One-time nonce: " + nonce);
    var acc = await web3.eth.getAccounts()
    var signature = await web3.eth.personal.sign(message, acc[0])

    var hash = web3.utils.fromUtf8("One-time nonce: " + nonce)
    var signing_address = await web3.eth.personal.ecRecover(hash, signature)

    if (signing_address !== metamaskAddr.toLowerCase()) {
      window.alert("Account verification failed. Try again.")
      return;
    }

    const response = await contract.methods.getUser(metamaskAddr).call();

    if (response['username'] === "" ||
      response['email'] === "") {
      window.alert("User does not exist. Please sign up");
      return;
    }

    const username = response['username'];
    const email = response['email'];

    console.log(username, email);

    localStorage.setItem('UserName', username);
    localStorage.setItem('Email', email);
    localStorage.setItem('MetamaskAddr', metamaskAddr);
   
    window.alert("Welcome back " + username);
    
    window.location.reload();
    // window.alert(localStorage.getItem('UserName'));

  }


  handlesignUp = async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[1].value;
    const addr = event.target[2].value;
    console.log(name, email, addr);

    const metamaskAddr = this.state.accounts[0];

    //Verify MetaMask account holder
    const nonce = Math.floor(Math.random() * 10000);
    var message = web3.utils.fromUtf8("One-time nonce: " + nonce);
    var acc = await web3.eth.getAccounts()
    var signature = await web3.eth.personal.sign(message, acc[0])

    var hash = web3.utils.fromUtf8("One-time nonce: " + nonce)
    var signing_address = await web3.eth.personal.ecRecover(hash, signature)

    if (signing_address !== metamaskAddr.toLowerCase() || metamaskAddr !== addr) {
      window.alert("Account verification failed. Try again.")
      return;
    }


    const contract = this.state.logincontract;

    const response = await contract.methods.getUser(metamaskAddr).call();
    if (response['username'] !== "" ||
      response['email'] !== "") {
      window.alert("User already exists. Log in with your MetaMask.");
      return;
    }

    await contract.methods.registerUser(metamaskAddr, name, email).send({ from: metamaskAddr });

    window.alert("User successfully created");

  }

  render() {
    if(localStorage.getItem('MetamaskAddr'))
    {
      return <Navigate to="/dashboard" />;
    }
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    // return <Navigate to="/" />;

    return (
      <div className="auth-wrapper">
        <svg className="svg_dstore" viewBox="0 0 960 300">
          <symbol id="s-text">
            <text text-anchor="middle" x="50%" y="80%">Dstore</text>
          </symbol>
          <g class="g-ants">
            <use xlinkHref="#s-text" class="text-copy-auth"></use>
            <use xlinkHref="#s-text" class="text-copy-auth"></use>
            <use xlinkHref="#s-text" class="text-copy-auth"></use>
            <use xlinkHref="#s-text" class="text-copy-auth"></use>
            <use xlinkHref="#s-text" class="text-copy-auth"></use>
          </g>
        </svg>
        <div className="auth-inner">
          <div id="button" >
            <button type="submit" className="metabutton" onClick={this.handlesignIn}>Login with Metamask</button>
          </div>
          <div >
            <h4 className="h4-auth-or">&nbsp;&nbsp; Or &nbsp;&nbsp;</h4>
          </div>
          <h3 id="sign">Sign Up</h3>

          <form onSubmit={this.handlesignUp}>
            <div class="row-auth" >
              <label id="label" className="label-auth">Name</label>
              <input type="text" placeholder="Enter name" />
            </div>
            <div class="row-auth" >
              <label id="label">Email Address</label>
              <input type="email" placeholder="Enter email" />
            </div>
            <div class="row-auth">
              <label id="label">  Metamask Address: </label>
              <input type="text" id="addr" value={this.state.accounts[0] ? this.state.accounts[0] : 'Click to connect to metamask'} disabled />
            </div>
            <div id="newbutton" class="row-auth" >
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

export default Authenticate;