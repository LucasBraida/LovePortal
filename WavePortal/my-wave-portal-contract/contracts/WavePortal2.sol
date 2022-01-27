// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal2{
uint256 totalWaves;
struct waverInfo {
    address endereco;
    uint256 waves;
}

mapping(address => waverInfo) wavers;
address[] public waverIds;

constructor() {
        console.log("Yo yo, I am a contract and I am smart");
}

function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
        waverInfo storage newWaver = wavers[msg.sender];
        newWaver.endereco = msg.sender;
        if(newWaver.waves > 0){
            newWaver.waves = newWaver.waves + 1;
        }else{
            newWaver.waves = 1;
        }
        
        waverIds.push(msg.sender);
    }
function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves); 
        return totalWaves;
    }

function getWaver(address id) public view returns (address , uint256){
        waverInfo storage w = wavers[id];
        //console.log(w.endereco);
        return (w.endereco, w.waves);
    }
}