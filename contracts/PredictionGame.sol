// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PredictionGame {
    uint256 public betCounter;
    
    event GamePlayed(uint256 indexed betId, address indexed player, uint256 amount, bool won, uint256 payout);
    
    // Single function - bet and settle in ONE transaction
    function playGame(bool isCorrect) external payable {
        require(msg.value > 0, "Bet must be > 0");
        
        uint256 payout;
        if (isCorrect) {
            payout = msg.value; // Win: 100% back
        } else {
            payout = (msg.value * 80) / 100; // Lose: 80% back
        }
        
        betCounter++;
        
        payable(msg.sender).transfer(payout);
        emit GamePlayed(betCounter, msg.sender, msg.value, isCorrect, payout);
    }
    
    receive() external payable {}
}
