var ERC721MintableComplete = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
           await this.contract.mint(account_one,1);
           await this.contract.mint(account_one,2);

        })

        it('should return total supply', async function () { 

            let totalSupply;

            try{
                totalSupply = await this.contract.getTokenSupply()

            }catch(err){
                console.log('error fetching supply',err)

            }
           assert.equal(totalSupply.toNumber(),2,'Unable to fetch total supply')
        })

        it('should get token balance', async function () { 
            let balance;
            try{
                balance = await this.contract.balanceOf(account_one);
            }catch(err){
                console.log(err)
            }

            assert.equal(balance.toNumber(),2,'User balance is incorrect')
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 

            const firstAccountTokenURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1'
            let tokenURI;

            try{
               tokenURI = await this.contract.tokenURI(1)
            }catch(err){
                console.log(err)
            }

            assert.equal(tokenURI,firstAccountTokenURI,"Token URI don't match ")
        })

        it('should transfer token from one owner to another', async function () { 

            // ARRANGE
            let firstAcctBalanceBeforeTransfer;
            let secondAcctBalanceBeforeTransfer;
            let firstAcctBalanceAfterTransfer;
            let secondAcctBalanceAfterTransfer;

            // fetch balance before transfer
            firstAcctBalanceBeforeTransfer = await this.contract.balanceOf(account_one);  // should be 2 before transfer.
            secondAcctBalanceBeforeTransfer = await this.contract.balanceOf(account_two); // should be 0 before transfer.

            assert.equal(firstAcctBalanceBeforeTransfer.toNumber(), 2, 'Account_one balance should be 2');
            assert.equal(secondAcctBalanceBeforeTransfer.toNumber(), 0, 'Account_two balance should be 0 before transfer');

            // ACT
            try{
               await this.contract.transferFrom(account_one,account_two,1)
            }catch(err){
                console.log(err)
            }

            // get balance of first account after transfer
            firstAcctBalanceAfterTransfer = await this.contract.balanceOf(account_one);
            // get balance of second account after transfer
            secondAcctBalanceAfterTransfer = await this.contract.balanceOf(account_two);

            // ASSERT 

            assert.equal(firstAcctBalanceAfterTransfer.toNumber(),1,"Token didn't get transfered")
            assert.equal(secondAcctBalanceAfterTransfer.toNumber(),1,"Token didn't get transfered")
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 

            let hasMinted = false;

            try{
                await this.contract.mint(account_two,3,{from:account_two});

                // will not execute if the above minting function fails.
                hasMinted = true;
                
            }catch(err){
                // console.log(err)
            }

            // ASSERT
            assert.equal(hasMinted,false,"Only owner can mint a token");
        })

        it('should return contract owner', async function () { 
            let owner;
            try{
              owner =  await this.contract.owner()
            }catch(err){
                console.log(err)
            }
            assert.equal(owner,account_one,"First account should be owner of the contract")
        })

    });
})