const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Access Control", function () {
    async function deployControlSC() {
        const [owner, otherAccount] = await ethers.getSigners();

        const Original = await ethers.getContractFactory("ACOriginal");
        const orig = await Original.deploy();

        const Bit = await ethers.getContractFactory("ACBit");
        const bit = await Bit.deploy();

        return { owner, otherAccount, orig, bit };
    }

    describe("Diff", function () {
        it("Deploy", async function () {
            const { owner, orig, bit } = await loadFixture(deployControlSC);
            const adminRole = await orig.DEFAULT_ADMIN_ROLE();
            const bitAdminRole = await bit.DEFAULT_ADMIN_ROLE();

            console.log(await bit.readRolesAsBits(owner.address));
            expect(await orig.hasRole(adminRole, owner.address)).to.equal(true);
            expect(await bit.hasRole(bitAdminRole, owner.address)).to.equal(true);
        });

        it("Grant and revoke Role", async function () {
            const { owner, otherAccount, orig, bit } = await loadFixture(deployControlSC);
            const minterRole = await orig.MINTER();
            const bitMinterRole = await bit.MINTER();

            await orig.grantRole(minterRole, otherAccount.address);
            await bit.grantRole(bitMinterRole, otherAccount.address);

            expect(await orig.hasRole(minterRole, otherAccount.address)).to.equal(true);
            expect(await bit.hasRole(bitMinterRole, otherAccount.address)).to.equal(true);

            console.log(await bit.readRolesAsBits(otherAccount.address));

            const depositorRole = await orig.DEPOSITOR();
            const bitDepositorRole = await bit.DEPOSITOR();

            await orig.grantRole(depositorRole, otherAccount.address);
            await bit.grantRole(bitDepositorRole, otherAccount.address);

            console.log(await bit.readRolesAsBits(otherAccount.address));

            expect(await orig.hasRole(depositorRole, otherAccount.address)).to.equal(true);
            expect(await bit.hasRole(bitDepositorRole, otherAccount.address)).to.equal(true);

            await orig.revokeRole(minterRole, otherAccount.address);
            await bit.revokeRole(bitMinterRole, otherAccount.address);
            await orig.revokeRole(depositorRole, otherAccount.address);
            await bit.revokeRole(bitDepositorRole, otherAccount.address);

            console.log(await bit.readRolesAsBits(otherAccount.address));
            // console.log(await bit.readRolesAs(otherAccount.address));

            expect(await orig.hasRole(minterRole, otherAccount.address)).to.equal(false);
            expect(await bit.hasRole(bitMinterRole, otherAccount.address)).to.equal(false);
            expect(await orig.hasRole(depositorRole, otherAccount.address)).to.equal(false);
            expect(await bit.hasRole(bitDepositorRole, otherAccount.address)).to.equal(false);
        });

        it("Can revoke admin", async function () {
            const { owner, otherAccount, orig, bit } = await loadFixture(deployControlSC);
            const adminRole = await orig.DEFAULT_ADMIN_ROLE();
            const bitAdminRole = await bit.DEFAULT_ADMIN_ROLE();

            await orig.grantRole(adminRole, otherAccount.address);
            await bit.grantRole(bitAdminRole, otherAccount.address);

            expect(await orig.hasRole(adminRole, otherAccount.address)).to.equal(true);
            expect(await bit.hasRole(bitAdminRole, otherAccount.address)).to.equal(true);

            await orig.revokeRole(adminRole, otherAccount.address);
            await bit.revokeRole(bitAdminRole, otherAccount.address);
        });

        it("Can renounce role", async function () {
            const { owner, otherAccount, orig, bit } = await loadFixture(deployControlSC);
            const adminRole = await orig.DEFAULT_ADMIN_ROLE();
            const bitAdminRole = await bit.DEFAULT_ADMIN_ROLE();

            await orig.grantRole(adminRole, otherAccount.address);
            await bit.grantRole(bitAdminRole, otherAccount.address);

            expect(await orig.hasRole(adminRole, otherAccount.address)).to.equal(true);
            expect(await bit.hasRole(bitAdminRole, otherAccount.address)).to.equal(true);

            await orig.connect(otherAccount).renounceRole(adminRole, otherAccount.address);
            await bit.connect(otherAccount).renounceRole(bitAdminRole);
        });

        it("Can grant all roles", async function () {
            const { otherAccount, bit } = await loadFixture(deployControlSC);
            const bitAdminRole = await bit.DEFAULT_ADMIN_ROLE();
            const bitMinterRole = await bit.MINTER();
            const bitDepositorRole = await bit.DEPOSITOR();
            const bitWithdrawerRole = await bit.WITHDRAWER();
            const bitCAdminRole = await bit.ADMIN();
            const bitChefRole = await bit.CHEF();
            const bitProtocolRole = await bit.PROTOCOL();
            const bitSpecificRole = await bit.SPECIFIC();


            await bit.grantRole(bitAdminRole, otherAccount.address);
            await bit.grantRole(bitMinterRole, otherAccount.address);
            await bit.grantRole(bitDepositorRole, otherAccount.address);
            await bit.grantRole(bitWithdrawerRole, otherAccount.address);
            await bit.grantRole(bitCAdminRole, otherAccount.address);
            await bit.grantRole(bitChefRole, otherAccount.address);
            await bit.grantRole(bitProtocolRole, otherAccount.address);
            await bit.grantRole(bitSpecificRole, otherAccount.address);

            console.log(await bit.readRolesAsBits(otherAccount.address));
        })
    });
});
