// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    uint256 private seed;

    struct Wave {
        address waver;
        uint256 timestamp;
        string message;

    }

    event NewWave(address indexed from, uint256 timestamp, string message);

    Wave[] waves;

    mapping(address => uint256) public lastWaveTmp;

    constructor() payable {
        //console.log("Yo yo, I am a contract and I am smart");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {

        require(lastWaveTmp[msg.sender] + 5 minutes < block.timestamp, "Wait a few more minutes");
        seed = (block.timestamp + block.difficulty + seed) % 100;

        lastWaveTmp[msg.sender] = block.timestamp;
        totalWaves += 1;
        waves.push(Wave(msg.sender, block.timestamp , _message));
        //console.log("%s waved w/ message %s", msg.sender, _message);
        emit NewWave(msg.sender, block.timestamp, _message);

        //console.log("Random seed number %d", seed);
        if(seed <= 50){
            console.log("You have won %s ", msg.sender);

            uint256 prizeAmount = 0.001 ether;

            require(prizeAmount <= address(this).balance, "Sorry! Trying to send more funds than I have available");

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "FAiled to withdraw money from the contract");}
    }

    function getTotalWaves() public view returns (uint256) {
        //console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
    function isWaverOkayToWave(address waver) public view returns (bool){
        return lastWaveTmp[waver] + 15 minutes < block.timestamp;
    }
    function getAllWaves() public view returns(Wave[] memory){
        return waves;
    }
}
