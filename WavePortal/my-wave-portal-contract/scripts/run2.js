const main = async () => {
    const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance: " + hre.ethers.utils.formatEther(contractBalance))
    console.log("First round of love")
    let waveTxn = await waveContract.connect(randomPerson2).sendLove(randomPerson.address, {value: ethers.utils.parseEther("0.0001")})
    await waveTxn.wait();
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance: " + hre.ethers.utils.formatEther(contractBalance))
    let randomPersonsBalance = await randomPerson.getBalance()
    console.log("The balance of randomPerson is:" + hre.ethers.utils.formatEther(randomPersonsBalance))
    let randomPerson2Balance = await randomPerson2.getBalance()
    console.log("The balance of randomPerson2 is:" + hre.ethers.utils.formatEther(randomPerson2Balance))
    /*console.log("Second round of love")
    waveTxn = await waveContract.connect(randomPerson2).sendLove(randomPerson.address, {value: ethers.utils.parseEther("0.0001")})
    await waveTxn.wait();
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance: " + hre.ethers.utils.formatEther(contractBalance))
    randomPersonsBalance = await randomPerson.getBalance()
    console.log("The balance of randomPerson is:" + hre.ethers.utils.formatEther(randomPersonsBalance))
    randomPerson2Balance = await randomPerson2.getBalance()
    console.log("The balance of randomPerson2 is:" + hre.ethers.utils.formatEther(randomPerson2Balance))
    console.log("Third round of love")
    waveTxn = await waveContract.connect(randomPerson2).sendLove(randomPerson.address, {value: ethers.utils.parseEther("0.0001")})
    await waveTxn.wait();
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance: " + hre.ethers.utils.formatEther(contractBalance))
    randomPersonsBalance = await randomPerson.getBalance()
    console.log("The balance of randomPerson is:" + hre.ethers.utils.formatEther(randomPersonsBalance))
    randomPerson2Balance = await randomPerson2.getBalance()
    console.log("The balance of randomPerson2 is:" + hre.ethers.utils.formatEther(randomPerson2Balance))*/

  };

  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  runMain();
