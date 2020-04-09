pragma solidity >=0.4.21 <0.7.0;

contract Election{

//Store Candidate
//Read Candidate decelering it public gives free getter function
string public candidate;
//Constructor

constructor() public {
    candidate = "Candidate 1";
}



}
