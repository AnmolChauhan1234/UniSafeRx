pragma solidity ^0.8.0;

contract MedicineRegistry {
    mapping(string => bytes32) private medicineHashes;

    function register(string memory key, bytes32 hash) public {
        medicineHashes[key] = hash;
    }

    function getHash(string memory key) public view returns (bytes32) {
        return medicineHashes[key];
    }

    function exists(string memory key) public view returns (bool) {
        return medicineHashes[key] != bytes32(0);
    }
}
