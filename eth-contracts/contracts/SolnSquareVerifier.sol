// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./Verifier.sol";



contract SolnSquareVerifier is ERC721Mintable{

    // Solutions struct that can hold an index & an address
    struct Solution{
        address sender;
        uint index;
    }
    
    // Array of to store unique solutions submitted. 
    Solution[] solutions;

    // Mapping to store unique solutions submitted
    mapping(uint => Solution) private uniqSolutions;


    // Emiited after solution has been added to solutions array.
    event SolutionAdded(address to, uint index);


    // Modifier to make sure solution has been verified before minting
    modifier verifySolution(){
        // call functions inside square verifier to check
        // use require statement to pass or fail
        _;
    }



    function isSolutionUnique () internal returns (bool){

    }


    // Function to add unique solutions into solutions array and emit event afterward.
    function addSolutionToArray(address to, uint index) public {
        //assign params to solution
        Solution memory solution = Solution(to,index);

        //push solutions to array
        solutions.push(solution);

        //emit event of solution added
        emit SolutionAdded(to, index);
    }



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

    function mintNFT () public verifySolution {
        // check if solution is unique
        //handle meta data and tokenSupply
    }



} // End contract
















  


























