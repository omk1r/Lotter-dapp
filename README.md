# Lottery3-dapp
This is Web3 Lottery Dapp where users can participate in lottery


```
# Lottery DApp

This is a decentralized application (DApp) for a lottery system built using React and Ethereum. The DApp allows users to buy tickets and participate in a lottery, with the winner selected randomly.

## Prerequisites

Before running the application, make sure you have the following dependencies installed:

- Node.js (v14 or higher)
- MetaMask browser extension (for interacting with the Ethereum network)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/omk1r/lottery2-dapp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd lottery-dapp
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the application:

   ```bash
   npm start
   ```

2. Open the application in your browser at `http://localhost:3000`.

3. Make sure your MetaMask extension is connected to the desired Ethereum network (e.g., Matic Mainnet).

4. The Dapp will automatically popup the metamask wallet to connect with wallet.

5. The DApp will display the contract address, user address, number of players, and contract balance.

6. Click the "Buy Ticket" button to purchase a ticket in the lottery. Make sure you have sufficient MATIC balance in your MetaMask account.

7. Click the "Pick Winner" button (accessible only by the manager address) to randomly select a winner from the players. This will transfer the contract balance to the winner's address.

## Contract

The DApp interacts with a deployed smart contract on the polygon mumbai network. The contract code is available in the `contracts/Lottery.sol` file. Make sure to deploy the contract before running the DApp.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Feel free to customize and modify the README file according to your specific project details.
