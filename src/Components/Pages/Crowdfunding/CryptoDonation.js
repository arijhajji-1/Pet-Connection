import React, { useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import "./crowd.css";

const CryptoDonation = () => {
  const [donationAmount, setDonationAmount] = useState(0.0001);

  const connectToMetamask = async () => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);

        const accounts = await web3.eth.requestAccounts();

        console.log("Connected to Metamask with account:", accounts[0]);
      } else {
        console.log("Please install Metamask!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDonate = async () => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);

        const accounts = await web3.eth.requestAccounts();

        const donationWei = web3.utils.toWei(
          donationAmount.toString(),
          "ether"
        );

        const transactionParameters = {
          from: accounts[0],
          to: "0x5179169031b8fCdC3FF4798C982484BfA943034D", // Replace with the address of the receiving wallet
          value: donationWei,
        };

        await web3.eth.sendTransaction(transactionParameters);

        console.log("Donation successful!");
      } else {
        console.log("Please install Metamask!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3 style={{ color: "black", marginTop: "40px" }}>
        <img
          style={{ width: "45px", marginRight: "10px", marginTop: "-10px" }}
          src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
        />
        Donate with Metamask : {donationAmount}{" "} ETH
        <img
          style={{ width: "30px", marginRight: "10px", marginTop : "-5px"  }}
          src="https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg"
        />
      </h3>
      <input
        type="number"
        min="0"
        style={{
          backgroundColor: "white",
          border: "1px solid black",
          color: "black",
          marginTop: "10px",
          width: "170px",
        }}
        value={donationAmount}
        onChange={(event) => setDonationAmount(event.target.value)}
      />
      <button
        onClick={connectToMetamask}
        className="cryptoButtons"
        style={{ marginRight: "10px" }}
      >
        Connect to Metamask
      </button>
      <button onClick={handleDonate} className="cryptoButtons">
        Donate
      </button>
    </div>
  );
};

export default CryptoDonation;
