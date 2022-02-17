const main = async () => {
    const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance: " + hre.ethers.utils.formatEther(contractBalance))

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log("The number of waves so far is " + waveCount)
    let waveTxn = await waveContract.wave("Waving is fun");
    await waveTxn.wait();
    console.log("First Wave")
    waveTxn = await waveContract.connect(randomPerson).wave("Waving is fun")
    await waveTxn.wait()
    console.log("Second Wave")
    const okay = await waveContract.isWaverOkayToWave(randomPerson.address)
    console.log(okay)
    if(okay){
      waveTxn = await waveContract.connect(randomPerson).wave("Waving is fun")
      await waveTxn.wait()
    }else{
      console.log("Hold on waver! Give us a little time")
    }
    //waveTxn = await waveContract.connect(randomPerson).wave("Waving is fun")
    //await waveTxn.wait()
    waveCount = await waveContract.getTotalWaves();
    console.log("The number of waves so far is " + waveCount)
    //contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    //console.log("Contract balance: " + contractBalance)
    //console.log("Contract balance: " + hre.ethers.utils.formatEther(contractBalance))

    //waveCount = await waveContract.getTotalWaves();
    /*let randomPersonsBalance = await randomPerson.getBalance()
    console.log("The balance of randomPerson is:" + hre.ethers.utils.formatEther(randomPersonsBalance))
    await waveContract.connect(randomPerson).wave("Waving is fun");
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    //console.log("Contract balance: " + contractBalance)
    console.log("Contract balance: " + hre.ethers.utils.formatEther(contractBalance))
    /*await waveContract.connect(randomPerson).wave("Waving is fun");
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    //console.log("Contract balance: " + contractBalance)
    console.log("Contract balance: " + hre.ethers.utils.formatEther(contractBalance))
    await waveContract.connect(randomPerson).wave("Waving is fun");
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    //console.log("Contract balance: " + contractBalance)
    console.log("Contract balance: " + hre.ethers.utils.formatEther(contractBalance))
    /*await waveContract.connect(randomPerson).wave("Waving is fun");
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    //console.log("Contract balance: " + contractBalance)
    console.log("Contract balance: " + hre.ethers.utils.formatEther(contractBalance))
    //await waveTxn.wait();*/

    /*waveTxn = await waveContract.connect(randomPerson2).wave("Waving is fun");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waves = await waveContract.getAllWaves();
    //await waver.wait();

    //console.log(waves)
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    //console.log("Contract balance: " + contractBalance)
    console.log("Contract balance: " + hre.ethers.utils.formatEther(contractBalance))
    randomPersonsBalance = await randomPerson.getBalance()
    console.log("The balance of randomPerson is:" + hre.ethers.utils.formatEther(randomPersonsBalance))
    */

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
