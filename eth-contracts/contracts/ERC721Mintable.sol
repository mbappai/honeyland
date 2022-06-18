// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import 'openzeppelin-solidity/contracts/utils/Address.sol';
// import 'openzeppelin-solidity/contracts/utils/Counters.sol';
// import 'openzeppelin-solidity/contracts/utils/math/SafeMath.sol';
// import 'openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol';
// import "./Oraclize.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/Pausable.sol";


//  TODO's: Create CustomERC721Token contract that inherits from the ERC721Metadata contract. You can name this contract as you please
//  1) Pass in appropriate values for the inherited ERC721Metadata contract
//      - make the base token uri: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/
//  2) create a public mint() that does the following:
//      -can only be executed by the contract owner
//      -takes in a 'to' address, tokenId, and tokenURI as parameters
//      -returns a true boolean upon completion of the function
//      -calls the superclass mint and setTokenURI functions

contract ERC721Mintable is ERC721URIStorage,Ownable,Pausable {

    using Counters for Counters.Counter;

    //create variable to hold tokenSupply
    Counters.Counter s_tokenSupply;


    function getTokenSupply() public view returns(uint256){
        return s_tokenSupply.current();
    }

    constructor() ERC721('HoneyToken','HYT'){}

    // set baseURI by overriding the default inside ERC721
    function _baseURI() internal override view virtual returns (string memory) {
        return "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
    }



    function mint(address to, uint256 tokenId) public onlyOwner whenNotPaused returns(bool){
        //mint token
        _safeMint(to,tokenId);

        //update tokenSupply
        s_tokenSupply.increment();

        return true;
    }

}

