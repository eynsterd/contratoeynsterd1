import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

// Esto carga el archivo .env
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "paris", // Necesario para evitar error de PUSH0 en Sepolia
    },
  },
  networks: {
    sepolia: {
      // Usamos el operador "||" para que nunca sea undefined
      url: process.env.SEPOLIA_URL || "https://sepolia.infura.io/v3/449f2574960445469291c6811ea983f7",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
  // Configuración del reportero de gas que instalamos al inicio
  gasReporter: {
    enabled: true,
    currency: "USD",
  }
};

export default config;
