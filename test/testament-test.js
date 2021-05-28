const { expect } = require('chai');

describe('Testament', function() {
  let dev, owner, doctor, Testament, testament;
  beforeEach(async function() {
    [dev, owner, doctor, alice] = await ethers.getSigners();
    Testament = await ethers.getContractFactory('Testament');
    testament = await Testament.connect(dev).deploy(owner.address, doctor.address);
    testament.deployed();
  });

  // Testing at deployement
  describe('Deployement', function() {
    it('Doctor should not be owner', async function() {
      await expect(Testament.connect(dev).deploy(doctor.address, doctor.address)).to.be.revertedWith(
        'Testament: You cannot define the owner and the doctor as the same person.'
      );
    });
  });

  // Testing the Bequeath Function
  describe('Bequeath', function() {
    it('Legacy account should update', async function() {
      await testament.connect(owner).bequeath(alice.address, {
        value: 1000
      });
      expect(await testament.connect(alice).legacyOf(alice.address)).to.equal(1000);
    });
    it('Should emit Bequeath event', async function() {
      await expect(
        testament.connect(owner).bequeath(alice.address, {
          value: 1000
        })
      )
        .to.emit(testament, 'Bequeath')
        .withArgs(alice.address, 1000);
    });
    it('Sould revert if other than owner is triyng to call the function', async function() {
      await expect(
        testament.connect(doctor).bequeath(alice.address, {
          value: 1000
        })
      ).to.revertedWith('Testament:  only the owner is allow to call that function.');
    });
  });

  describe('Withdraw', function() {
    beforeEach(async function () {
      await testament.connect(owner).bequeath(alice.address, {value: 1000})
      await testament.connect(doctor).setCertifiedDeath();
    });
    it('Should withdraw all the legacy funds', async function () {
      await expect(await testament.connect(alice).withdraw())
      .to.changeEtherBalance(alice, 1000)
    });
    it('Should revert if the legacy funds is set to none', async function () {
      await testament.connect(owner).decreaseBequeath(alice.address)
      await expect(testament.connect(alice).withdraw())
      .to.be.revertedWith('Testament: You do not have any legacy on this contract.')
    });
    it('Should revert if the owner is not dead yet', async function () {
      await testament.value()
    });
  });
});
