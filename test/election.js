var Election = artifacts.require("./Election.sol");
var electionInstance;

//Testing using Mocha and chai
//contract is from mocha and it also
contract("Election", function(accounts){

    it("Init with 2 candidates", function(){
        return Election.deployed().then(function(instance){
            return instance.candidateCount();// there was no s in the candidate count in my election file so i got error 
        }).then(function(count){             //which costed me almost half of an hour//
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


    it("Allows voter to cast a vote", function(){
        return Election.deployed().then(function(instance){
            electionInstance =instance;
            candidateId=1;
            return electionInstance.vote(candidateId,{from: accounts[0]});//todo ask accounts//so it is forom
        }).then(function(recipt){                                         //accounts from the top//recipt is the data we by doing
            //return electionInstance.voters(accounts[0]);                  //apps.vote(1,from:web3.eth.getAccounts(e=>e[0])) now passing accout to check if voters mapping contains the voter if yes it will return true
            assert.equal(recipt,logs,length, 1,"An event was triggerd");
            assert.equal(recipt,logs[0],event,)
        }).then(function(voted){
            assert(voted,"Voter marked as voted");
            return electionInstance.candidates(candidateId);
        }).then(function(candidate){
            var voteCount = candidate[2];
            assert.equal(voteCount,1,"incriment the candidate vote count");
        })
    });

//for invalid candidate testing

    it("Throws exception for invalid candidate", function(){
        return Election.deployed().then(function(instance){
                electionInstance = instance;
                return electionInstance.vote(99,{from: accounts[0]})
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, "Error message Must contain revert");//chck exception messege has revert

            //now ensuring if the vote count is changed or not//promise chain//well it shouldn't
            return electionInstance.candidates(1);
        }).then(function(candidate1){
            var voteCount = candidate1[2];
            assert.equal(voteCount,1,"Candidate 1 did not recived any vote");
            return electionInstance.candidates(2);
        }).then(function(candidate2){
            var voteCount= candidate2[2];
            assert.equal(voteCount,0,"Candidate 2 did not recived any vote");
        });
    });
    
    
    it("Throws an exception for double voting",function(){
        return Election.deployed().then(function(instance){
            electionInstance=instance;
            //here wo do for candidate 2
            candidateId=2;
            electionInstance.vote(candidateId,{from: accounts[1]});
            return electionInstance.candidates(candidateId);
        }).then(function(candidate){
            var voteCount = candidate[2];
            assert.equal(voteCount,1,"Accepts the first vote");
            //try to vote again
            return electionInstance.vote(candidateId, {from: accounts[1]});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, "Error message Must contain revert");//chck exception messege has revert
            //now ensuring if the vote count is changed or not//promise chain//well it shouldn't
            return electionInstance.candidates(1);
        }).then(function(candidate1){
            var voteCount = candidate1[2];
            assert.equal(voteCount,1,"Candidate 1 did not recived any vote");
            return electionInstance.candidates(2);
        }).then(function(candidate2){
            var voteCount= candidate2[2];
            assert.equal(voteCount,1,"Candidate 2 did not recived any vote");
        });
    });

















});