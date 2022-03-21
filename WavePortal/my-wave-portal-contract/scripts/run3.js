const main = async () => {
    const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    waveContract.on('NewWinner', (address, message) => {
        console.log(address + " " + message)
    })
    
    await waveContract.connect(randomPerson).sendLove(randomPerson2.address, {value: ethers.utils.parseEther("0.0001")});
    await waveContract.connect(randomPerson2).sendLove(randomPerson.address, {value: ethers.utils.parseEther("0.0001")});
    //await waveContract.connect(randomPerson2).sendLove(randomPerson2.address, {value: ethers.utils.parseEther("0.0001")});
    //await waveContract.connect(randomPerson).sendLove(randomPerson.address, {value: ethers.utils.parseEther("0.0001")});
    await waveContract.connect(randomPerson2).sendLove(randomPerson.address, {value: ethers.utils.parseEther("0.0001")});
    
    await new Promise(res => setTimeout(() => res(null), 5000));
    
  

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
