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
    await testament.connect(alice).withdra
  });
});
