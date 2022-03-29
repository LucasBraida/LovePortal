const main = async () => {
    const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance: " + hre.ethers.utils.formatEther(contractBalance))

    
    let waveTxn = await waveContract.wave("Waving is the best thin so fun so fun Im so happy to be waving kkkkkkkkkkkkkkkkkkkkkkkk lets wave so");
    await waveTxn.wait();
    console.log("First Wave")
    waveTxn = await waveContract.connect(randomPerson).wave("Waving is the best thin so fun so fkkkkkkkkkkkkkkkk lets wave so kkkkkkkk")
    await waveTxn.wait()
    console.log("Second Wave")
    let wavesArray = await waveContract.getAllWaves()
    //await wavesArray.wait()
    console.log(wavesArray)
    waveTxn = await waveContract.connect(randomPerson2).wave("Waving is the best thin so fun so fun Im so happy to be waving kkkkkkkkkkkkkkkkkkkkkkkk lets wave so kkkkkkkk")
    await waveTxn.wait()
    console.log("Third Wave")
    wavesArray = await waveContract.getAllWaves()
    await wavesArray.wait()
    console.log(wavesArray)
    

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
