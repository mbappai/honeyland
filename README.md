
# Honeyland

Honeyland is a decentralized application that is focused on solving the long existing problem of title ownership fraud in the real-estate industry. Honeyland is a marketplace that lists properties up for sale provided that seller proves ownership of the property about to be listed.  

## Components of the app architecture  

### Tokens (Property titles)

These are the tokens that will represent the `title ownerships` of a given property. Upon the attempt to list a new property in our marketplace, our smart-contract will verify the ownership of the given property by taking the title of the property and running it through our verification system.  

### Title Verifier (Zokrates verifier)

This is the system that accepts title property as input and verifies the ownership of that property submitted by the user. If the verification fails, then we are possibly witnessing a fraud case.

### Marketplace (Opensea)

This is the final part of our application. Tokens (tiltes) that passes our verification system, will now be eligible to be listed on the opensea decentralized market place for anyone to purchase.



# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
