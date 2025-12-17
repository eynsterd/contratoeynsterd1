// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Eynsterd {
    // Tres variables de estado
    string public coreName;
    uint256 public powerLevel;
    uint256 public registryCount;
    address public owner;

    constructor(string memory _name, uint256 _initialPower) {
        coreName = _name;
        powerLevel = _initialPower;
        registryCount = 0;
        owner = msg.sender;
    }

    // Función para aumentar el registro (similar a agregar)
    function triggerRegistry() public {
        registryCount += 1;
    }

    // Función para actualizar el nivel de poder
    function updatePower(uint256 _newPower) public {
        require(msg.sender == owner, "Solo el owner puede cambiar el poder");
        powerLevel = _newPower;
    }

    // Función para cambiar el nombre del Core
    function renameCore(string memory _newName) public {
        coreName = _newName;
    }
}
