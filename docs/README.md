# MON Prediction Game - Build & Deploy Guide

## Overview

A minimal Web3 prediction game on Monad blockchain where users predict income levels from demographic data and bet MON tokens.

**Game Flow:**

1. User connects MetaMask wallet (triggers popup)
2. User enters bet amount in MON
3. Random row from dataset is displayed (5 features only)
4. User predicts: Income ≤50K or >50K
5. Smart contract settles bet:
   - Correct: 130% payout (+30% profit)
   - Wrong: 80% payout (-20% loss)

---

## Files Included

- `adult.csv` - Dataset with ~300 rows, 6 columns
- `PredictionGame.sol` - Solidity smart contract for Monad
- `index.html` - Single-page frontend (HTML + embedded JS)
- `README.md` - This file

---

## Smart Contract Deployment

### Prerequisites

- Monad testnet/mainnet RPC endpoint
- MetaMask or other wallet with MON tokens
- Hardhat or Foundry (or Remix IDE)

### Using Remix IDE (Easiest)

1. Go to https://remix.ethereum.org
2. Create new file: `PredictionGame.sol`
3. Copy contract code into file
4. Compiler: Set to 0.8.0+
5. Compile the contract
6. Add Monad network to MetaMask:
   - Network Name: Monad
   - RPC URL: [Your Monad RPC endpoint]
   - Chain ID: [Monad chain ID]
   - Currency: MON
7. In Remix, select "Injected Provider" environment
8. Deploy contract
9. **Save the deployed contract address** - you'll need this for frontend

### Using Hardhat

```bash
npm init -y
npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
npx hardhat init

# Create hardhat.config.js with Monad network
# Create contracts/PredictionGame.sol with contract code

npx hardhat compile
npx hardhat run scripts/deploy.js --network monad
```

**Deploy Script (scripts/deploy.js):**

```javascript
async function main() {
  const PredictionGame = await ethers.getContractFactory("PredictionGame");
  const game = await PredictionGame.deploy();
  await game.deployed();
  console.log("Contract deployed to:", game.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
```

---

## Frontend Setup & Run

### Local Development

1. **Place files in same directory:**

   ```
   project/
   ├── index.html
   ├── adult.csv
   └── PredictionGame.sol
   ```

2. **Update contract address in index.html:**
   - Open `index.html`
   - Find: `contractAddress: '0x...'` (around line 295)
   - Replace with your deployed contract address
   - Example: `contractAddress: '0xAbcd1234...EF'`

3. **Start local server:**

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (if installed)
   npx http-server

   # Live Server (VS Code extension)
   Right-click index.html → Open with Live Server
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:8000`
   - MetaMask popup will trigger on "Connect Wallet" click

### Browser Requirements

- Chrome, Firefox, Edge, or Brave (MetaMask compatible)
- MetaMask extension installed
- Connected to Monad network

---

## How to Play (User Guide)

### Step 1: Connect Wallet

- Click "Connect MetaMask Wallet"
- MetaMask popup appears
- Approve connection
- Wallet address displays

### Step 2: Set Bet Amount

- Enter amount in MON (e.g., 1.5)
- A random prediction row automatically displays
- Shows 5 features: marital-status, occupation, relationship, race, gender
- **Income label is hidden** (the answer you predict)

### Step 3: Make Prediction

- Click "Income ≤ 50K" or "Income > 50K"
- Click "Place Bet"
- Results show immediately:
  - ✓ Correct: +30% profit
  - ✗ Wrong: -20% loss (80% returned)

### Step 4: Next Round

- Form resets automatically
- Enter new bet amount to play again

---

## Game Rules (On-Chain Settlement)

| Outcome     | Payout      | Formula        |
| ----------- | ----------- | -------------- |
| **Correct** | Stake + 30% | `stake × 1.30` |
| **Wrong**   | Stake - 20% | `stake × 0.80` |

Example:

- Bet 10 MON, predict correctly → Receive 13 MON
- Bet 10 MON, predict wrong → Receive 8 MON

---

## Technical Architecture

### Frontend (index.html)

- Single HTML file, no build required
- Pure vanilla JavaScript (no frameworks)
- CSV loaded via Fetch API
- MetaMask integration via `window.ethereum`
- Random row selection (no reshuffling)

### Smart Contract (PredictionGame.sol)

- Accepts MON bets via `placeBet(prediction)`
- Stores bet details on-chain
- `settleBet(betId, isCorrect)` pays out
- Owner can withdraw contract balance
- Events: BetPlaced, BetSettled

### Data Flow

1. Frontend loads CSV into memory
2. User selects bet amount
3. Random row index selected (0 to 313)
4. Features displayed, label hidden
5. User makes prediction
6. Frontend calls `placeBet(true/false)` on contract
7. Contract receives MON, stores bet
8. Frontend calls `settleBet(betId, isCorrect)` with answer
9. Contract sends payout to user wallet

---

## Customization

### Change Payout Rates

In `PredictionGame.sol`, modify `settleBet()`:

```solidity
// Current: +30% win, -20% loss
if (isCorrect) {
    payout = (bet.amount * 130) / 100;  // 130%
} else {
    payout = (bet.amount * 80) / 100;   // 80%
}
```

### Change Features Displayed

In `index.html`, modify `displayRandomRow()`:

```javascript
const features = [
  "marital-status",
  "occupation",
  "relationship",
  "race",
  "gender",
];
// Add/remove columns as needed
```

### Change Dataset

Replace `adult.csv` with any CSV with:

- Exactly 6 columns
- First 5 are features
- 6th column is binary label
- Format: `feature1,feature2,feature3,feature4,feature5,label`

---

## Security Notes

⚠️ **Production Considerations:**

1. **Frontend should NOT store private keys** - MetaMask handles this
2. **Contract validation**: Always verify prediction on-chain before payout
3. **Rate limiting**: Add per-user limits to prevent abuse
4. **Oracle integration**: For randomness, consider Chainlink VRF
5. **Test thoroughly** on testnet before mainnet deployment
6. **Audit contract** before handling real funds

---

## Troubleshooting

| Issue                  | Solution                                              |
| ---------------------- | ----------------------------------------------------- |
| MetaMask doesn't popup | Install MetaMask, refresh page                        |
| "Not connected" error  | Check MetaMask is on Monad network                    |
| CSV won't load         | Ensure `adult.csv` is in same folder as `index.html`  |
| Contract call fails    | Verify contract address in code, check wallet has MON |
| Wrong payout           | Verify correctness flag is being passed correctly     |

---

## Testing Checklist

- [ ] MetaMask connects with popup
- [ ] Wallet address displays after connection
- [ ] Bet amount input accepts valid numbers
- [ ] Random row displays with 5 features
- [ ] Prediction buttons toggle selection
- [ ] Correct predictions show +30% payout
- [ ] Wrong predictions show -20% payout
- [ ] Form resets after each round
- [ ] Can play multiple rounds in sequence

---

## Gas Optimization Tips

- Batch multiple bets into single transaction (if building for production)
- Use simplified ABI (already done - only includes needed functions)
- Consider storing dataset off-chain with hash verification on-chain

---

## Support

For issues with:

- **MetaMask**: https://metamask.io/help/
- **Monad**: Check RPC endpoint and network settings
- **Solidity**: https://docs.soliditylang.org/
- **This game**: Review contract code and frontend logic

---

**Ready to play? Deploy contract, update address in index.html, and start predicting!** 🎲💰
