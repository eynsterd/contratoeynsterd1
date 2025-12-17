import { ethers } from "hardhat";

async function main() {
  const name = "Eynsterd Prime";
  const initialPower = 9000;

  console.log("Iniciando despliegue de Eynsterd en Sepolia...");

  // En Hardhat v2 con TypeScript, usamos getContractFactory y deploy
  const Eynsterd = await ethers.getContractFactory("Eynsterd");
  const eynsterd = await Eynsterd.deploy(name, initialPower);

  await eynsterd.waitForDeployment();

  const address = await eynsterd.getAddress();
  console.log(`✅ Contrato Eynsterd desplegado en: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
