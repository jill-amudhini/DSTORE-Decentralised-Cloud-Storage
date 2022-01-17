import React from "react";
import Navbar from "./../../components/NavBar/NavBar";
import "./Dashboard.css";

import getWeb3 from "./../../getWeb3";
import CloudStorageContract from "./../../contracts/CloudStorage.json";

let web3 = null;

class Dashboard extends React.Component {

  state = {
    web3: null, accounts: null, loading: false, buffer: null, tableData: null,
    storedsize: 0, fileuploaded:0,fileshared:0
  };

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

            var storesize=0,filenos=0,fileshare=0;
            for (var i = 0; i < response.length; i++) {

              console.log(response[i])
              filenos+=1;
              storesize+=parseInt(response[i]['filesize']);
              if(response[i]['shared']===true)
                fileshare+=1;
            }
            storesize=Number(storesize/1024).toFixed(2);
            currentComponent.setState({ storedsize: storesize, fileuploaded: filenos, fileshared: fileshare })
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

  render() {
    return (
      <div>
        <Navbar />
        <div class="left">
          <div class="dcontainer">
            <div class="cover-photo">
              <img src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png" class="profile" />
            </div>
            <div class="profile-name">{localStorage.getItem('UserName')}</div>

            <p class="about">
              Email: <br />{localStorage.getItem('Email')}<br /><br />
              Address: <br />{localStorage.getItem('MetamaskAddr')}
            </p>

          </div>
        </div>

        <div class="right">

          <div class="c-dashboardInfo">
            <div class="wrap">
              <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Storage</h4>
              <span class="hind-font caption-12 c-dashboardInfo__count">{this.state.storedsize}KB</span>
            </div>
          </div>

          <div class="c-dashboardInfo">
            <div class="wrap">
              <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">No of files stored
              </h4><span class="hind-font caption-12 c-dashboardInfo__count">{this.state.fileuploaded}</span>
            </div>
          </div>

          <div class="c-dashboardInfo">
            <div class="wrap">
              <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">No of files shared by others
              </h4><span class="hind-font caption-12 c-dashboardInfo__count">{this.state.fileshared}</span>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Dashboard;