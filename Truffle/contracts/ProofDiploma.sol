pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract ProofDiploma {
    
    struct Diploma {
        uint id;
        string name;
        string diplomaNumber;
    }
    
   uint ids=0;
   address[] _authorized;
   Diploma[] public _Diplomas;
   mapping(address=>bool) authorized;
   mapping(address => Diploma) _items;
   address owner;
   
   
   constructor() public {
        owner=msg.sender;
        _authorized.push(msg.sender);
        authorized[msg.sender] = true;
    }

    function myFunction() public returns(string memory _mystring) {
        return ("yalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
    
   function create_item(string memory _name, string memory _diplomaNumber) public{
       //require(authorized[msg.sender]);
       _Diplomas.push(Diploma(ids,_name,_diplomaNumber));
       _items[msg.sender] = _Diplomas[ids];
       ids++;
   }
   
   function add_authorized(address _auth) public{
       require(msg.sender == owner);
       require(!authorized[_auth]);
       _authorized.push(_auth);
       authorized[_auth] = true;
   }
   
   function check_authorized(address _tocheck) view public returns(bool){
      if(find(_tocheck)){
       return true;}
       
       return false;
   }
   
   
   function item_present(string memory _diplomaNumber) view public returns(Diploma memory) {
    for(uint i = 0; i < _Diplomas.length; i++) {
       if( keccak256(abi.encodePacked(_diplomaNumber))==keccak256(abi.encodePacked(_Diplomas[i].diplomaNumber))){
        return (_Diplomas[i]);
      }
    }
    revert('Diploma is not recorder');
  }



   
   function find(address _addr) view internal returns(bool) {
    for(uint i = 0; i < _authorized.length; i++) {
      if(_authorized[i] == _addr) {
        return true;
      }
    }
    return false;
  }

}