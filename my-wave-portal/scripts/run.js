const main = async () => {
    const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal2");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
  
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);
  
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
  
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();
  
    waveCount = await waveContract.getTotalWaves();
  
    await waveContract.connect(randomPerson).wave();
    await waveContract.connect(randomPerson).wave();
    await waveContract.connect(randomPerson).wave();
    await waveContract.connect(randomPerson).wave();
    //await waveTxn.wait();
    
    await waveContract.connect(randomPerson2).wave();
    //await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waver = await waveContract.getWaver(randomPerson.address);
    //await waver.wait();

    console.log(waver[0] + " waved " + waver[1] + " times and we stored that in the blockchain")
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