pragma solidity >=0.4.22 <0.8.0;


// Legalage contract to make the PROOF OF AGE VERIFICATION.
// The contract stores the ZK proof on the chain together with all 
// input data for its validation.
//
// The current form of contract is trivial, but the contract is expected
// to be extended to provide a method for verification
// payment according to a selected bussiness model. For example
// the certifier may be paid by the verifier for each verification by
// a direct transfer of funds of the prover may prepaid certain amount
// of verifications which are released after successfull ZK proof
// verification. In the later case ZK proof verification would be
// called (generated either by ZoKrates of a similar tool.)
contract Poav {

    // SHA256 hash of the prover's photo. Permanent, immutable.
    uint photo_hash;

    // Creates the POAV contract.
    constructor(uint ph) public {
        photo_hash = ph;
    }

    function getPhotoHash() public view returns (uint256) {
        return photo_hash;
    }

    // Event emmited after each POAV.
    event PoavEvent(
       	  address verifier,
    	  uint8 feedback,
	  bytes zk_proof,
	  uint8 result,
	  uint delta,
	  uint today,
	  uint is_younger,
	  uint256 prover_key);
	  
    // Proof of Age Verification
    function recordProof(
            uint8 feedback,   
            bytes memory zk_proof,
            uint delta,
	    uint today,
	    uint is_younger,
	    uint256 prover_key
        ) public  returns (uint8)
     {
            uint8 result = feedback;
	    emit PoavEvent(
	    	 msg.sender,
		 feedback,
		 zk_proof,
		 result,
		 delta,
		 today,
		 is_younger,
		 prover_key);
	return result;
     }
}
