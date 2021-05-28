const { expect } = require('chai');

describe('ICO', function() {
  let dev, owner,ICO, ico;
  beforeEach(async function() {
    [dev, owner, alice] = await ethers.getSigners();
    ICO = await ethers.getContractFactory('ICO');
    ico = await ICO.connect(dev).deploy(owner.address);
    ico.deployed();
  });

  // Testing at deployement
  describe('Deployement', function() {
    it('', async function() {
      await expect(ICO.connect(dev).deploy()).to.be.revertedWith(
        'ICO: .'
      );
    });
  });

  // Testing the  Function
  describe('', function() {
    it('', async function() {
      await ico.connect(owner).(, {
        value: 1000
      });
      expect(await ico.connect(alice).legacyOf(alice.address)).to.equal(1000);
    });
    it('', async function() {
      await expect(
        ico.connect(owner).(alice.address, {
          value: 1000
        })
      )
        .to.emit(ico, 'Bequeath')
        .withArgs(alice.address, 1000);
    });
    it('Sould revert if other than owner is triyng to call the function', async function() {
      await expect(
        ico.connect().(, {
          value: 1000
        })
      ).to.revertedWith('ICO:  only the owner is allow to call that function.');
    });
  });

  describe('Withdraw', function() {
    beforeEach(async function () {
      await ico.connect(owner).bequeath(alice.address, {value: 1000})
    });
    it('Should withdraw all the legacy funds', async function () {
      await expect(await ico.connect().withdraw())
      .to.changeEtherBalance(, 1000)
    });
    it('', async function () {
      await ico.connect(owner).(alice.address)
      await expect(ico.connect().withdraw())
      .to.be.revertedWith('ICO: ')
    });
    
  });
    
});
