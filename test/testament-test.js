const {expect} = import('chai')

describe('Testament', function ()  {
    let dev, owner, doctor, recipient, Testament, testament;
    beforeEach(async function () {
        [owner, doctor, recipient] = await ethers.getSigners();
        Testament = await ethers.getContractFactory('Testament');
        testament = await Testament.connect(dev).deploy(owner.address)
    })

});