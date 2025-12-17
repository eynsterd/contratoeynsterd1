import { expect } from "chai";
import { ethers } from "hardhat";
import { Eynsterd } from "../typechain-types"; // Asegúrate de haber corrido 'npx hardhat compile'
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("Contrato Eynsterd", function () {
  let eynsterd: Eynsterd;
  let owner: SignerWithAddress;
  let otherAccount: SignerWithAddress;

  const INITIAL_NAME = "Eynsterd Prime";
  const INITIAL_POWER = 9000;

  // Se ejecuta antes de cada test
  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();

    const EynsterdFactory = await ethers.getContractFactory("Eynsterd");
    eynsterd = await EynsterdFactory.deploy(INITIAL_NAME, INITIAL_POWER);
  });

  describe("Despliegue", function () {
    it("Debería configurar el nombre core correcto", async function () {
      expect(await eynsterd.coreName()).to.equal(INITIAL_NAME);
    });

    it("Debería configurar el nivel de poder inicial", async function () {
      expect(await eynsterd.powerLevel()).to.equal(INITIAL_POWER);
    });

    it("Debería asignar al owner correctamente", async function () {
      expect(await eynsterd.owner()).to.equal(owner.address);
    });
  });

  describe("Funcionalidad", function () {
    it("Debería aumentar registryCount al llamar a triggerRegistry", async function () {
      await eynsterd.triggerRegistry();
      expect(await eynsterd.registryCount()).to.equal(1);
    });

    it("Debería permitir al owner actualizar el poder", async function () {
      await eynsterd.updatePower(9500);
      expect(await eynsterd.powerLevel()).to.equal(9500);
    });

    it("Debería fallar si alguien que no es el owner intenta actualizar el poder", async function () {
      await expect(
        eynsterd.connect(otherAccount).updatePower(10000)
      ).to.be.revertedWith("Solo el owner puede cambiar el poder");
    });

    it("Debería cambiar el nombre del Core", async function () {
      await eynsterd.renameCore("Eynsterd Neo");
      expect(await eynsterd.coreName()).to.equal("Eynsterd Neo");
    });
  });
});
