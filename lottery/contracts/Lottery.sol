// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    address[] public players;
    address public previousWinner;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether, "You need at least 1 eth to take part.");

        players.push(msg.sender);
    }

    function getNumberOfPlayers() public view returns (uint256) {
        return players.length;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function lotteryBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function pickWinner() public restricted {
        uint256 index = random() % players.length;
        address winner = players[index];
        payable(winner).transfer(address(this).balance);

        previousWinner = winner;
        players = new address[](0);
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            );
    }

    modifier restricted() {
        require(
            msg.sender == manager,
            "Winner winner only the manager can choose dinner."
        );
        _;
    }
}
