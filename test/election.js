var Election = artifacts.require("./Election.sol");
var electionInstance;

//Testing using Mocha and chai
//contract is from mocha and it also
contract("Election", function(accounts){

    it("Init with 2 candidates", function(){
        return Election.deployed().then(function(instance){
            return instance.candidateCount();// there was no s in the candidate count in my election file so i got error 
        }).then(function(count){             //which costed me almost half of an hour
            //assert is from chai
            assert.equal(count,2);
        });
    });

    it("it Init the candidates with the correct value", function(){
        return Election.deployed().then(function(instance){
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate){
            assert.equal(candidate[0],1,"Contains the correct id");
            assert.equal(candidate[1],"Candidate 1","Contains the correct name");
            assert.equal(candidate[2],0,"Contains the correct vote count");
            return electionInstance.candidates(2);
        }).then(function(candidate){
            assert.equal(candidate[0],2,"Contains the correct id");
            assert.equal(candidate[1],"Candidate 2","Contains the correct name");
            assert.equal(candidate[2],0,"Contains the correct vote count");
        });
    });

});