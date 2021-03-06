// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var Verifier = artifacts.require('Verifier');

// import proof's from zokrates folder
const Proof = require('../../zokrates/code/square/proof.json');

contract('SquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    // parameters to pass to verifyTx function 
    const proof = Proof.proof;
    const inputs = Proof.inputs;


    describe('Testing verification', function () {
        beforeEach(async function () { 
            this.contract = await Verifier.new();
        })

        it('with correct proof should pass',async function(){

            let result;

            try{
            //   result =  this.contract.verifytTx(proof,inputs);
            result = await this.contract.verifyTx(proof,inputs)
            }catch(err){
                console.log(err)
            }

            assert.equal(result,true,'The proof you provided is incorrect')
        })

        it('with incorrect proof fails',async function(){

            let result;

            try{
            //   result =  this.contract.verifytTx(proof,inputs);
            result = await this.contract.verifyTx(proof,[23,43])
            }catch(err){
                console.log(err)
            }

            assert.equal(result,false,'The proof you provided is incorrect')
        })

})

});
// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

    
// Test verification with incorrect proof
