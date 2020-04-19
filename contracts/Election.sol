pragma solidity >=0.4.21 <0.7.0;

contract Election{

//Model a candidate
struct Candidate{
    uint id;
    string name;
    uint voteCount;
}

// voted event //same
    event votedEvent (
        uint indexed _candidateId
    );

//Store a candidate
mapping(address => bool) public voters;// if a voter voted!//bonus voter fun as well//cls
//Fetch Candidate
mapping(uint => Candidate) public candidates;// data layer of block chain.....
//Store Candidate Count
uint public candidateCount;

constructor() public {
    addCandidate("Candidate 1");
    addCandidate("Candidate 2");
    //reset flag migrate time as// data is immutable it is not supposed to be changed
    //for this reasone migration is supposed to be run only once
    //so it will push new copy of smart contract and a new address will be assigned//lot like dropping table and starting from begining
    }

 function addCandidate (string memory _name) private{
    candidateCount ++;
    candidates[candidateCount] = Candidate(candidateCount, _name, 0);
}

function vote(uint  _candidateId) public {
    //first check if voter has voted before or not
    require(!voters[msg.sender],"Has voted Alredy");  //if true then the follwing will execute else not so we will check using msg.sender
    //required a valid candidate to vote for
    require(_candidateId > 0 && _candidateId<=candidateCount, "Candidate not avalible");

    //record that voter has voted
    //msg.sender;//metadata provided with solidity it assces that which accout has voted//as the accout can be seen active in the metamask
    //metadata cand be assed into {} for msg uses from: metadata
    voters[msg.sender] = true;
    //update candidate vote count
    candidates[_candidateId].voteCount++;


    // trigger voted event //added later no notice given
        emit votedEvent(_candidateId);
}


//Id did not gave errors though (Taking Screenshot) var candidate=app.candidates()
//Asychronuous so writing new command in cmd see below
//truffle(development)> app.candidates(1).then(function(c){candidate=c;})

//now the candidate.id will not work as actually EVM dosent know The Struct at first place
//So we need to use array like method candidates[0] of id [1] for name [2] for votecount
//type casting for value usage from psudo stuct candidate[0].toNumber()

//web3.eth.accounts no longer works
//do like this :var accounts = web3.eth.getAccounts()
//: truffle(development)>accounts to get all accounts to get single account do(Below)
// var account0;
//   web3.eth.getAccounts().then(function(result){
//     account0 = result[0];
//   })

//or web3.eth.getAccounts().then(e=> A1=e[0]);

}
