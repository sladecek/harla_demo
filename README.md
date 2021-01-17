% LegalAge
% Ladislav Sládeček ladislav.sladecek@gmail.com
% 17.01.2020 (version 1.0)

# Introduction

*LegalAge* is a privacy-preserving age-verification service based on
[zero knowledge](https://www.zeroknowledge.fm/) cryptography and the
[HarmonyOne](https://www.harmony.one/) blockchain.

Many people feel uncomfortable to show a passport or an ID-card to
strangers, because they can be stalked or their document may be
secretly photocopied and their identity stolen.  Using the service,
anyone can prove that they are older or younger than certain age
without presenting an ID or telling the exact date of birth.

The application protocol works with three parties: the *prover* is the
person who wants to prove their age. The prover launches the
*LegalAge* mobile applications and select the age she wants to
prove. The phone generates a cryptographical proof contained in a QR
code which they then present to the *verifier* (for example a
bartender). The verifier scans the code with his own phone.  The
application validates the proof and downloads an electronically signed
photograph of the prover from a cloud storage. The verifier verifies
the identity of the prover and sends feedback information back to the
service.

During each verification, the service makes a permanent record in the
blockchain containing both the input data (or their cryptographical
hashes) and the ZK proof and a payment may be processed.

Another party is the *certifier*. Certifier is an institution who is
trusted by both the service and the prover. The prover must verify the
age of the prover and their photos. It is assumed that certification
will be provided for free as a part of some other activity which
requires age verification. For example an university can certify the
age of all its students using enrollment data and their student ID
photographs. Or a retail organization can certify its customer when
issuing a loyalty card. A library or a club when registering a member
and so on.

What happens when someone cheats? The barkeeper can, in this case hire
an *expert witness* who collects all the information from the
blockchain, verifies ZK proofs, verifies the signatures of the photos
and finally concludes that the prover must have abused an electronic
system which is usually a criminal offense (for example by stealing a
phone from an older brother).

Moreover the verifier can show to the court the usage statistics of
the service which proves that the age of the visitors of the
bar is being verified regularly and only occasional errors and abuse
may happen. 

The service is completely decentralized, there is not a single point
of control except for the blockchain. The privacy of the prover is
protected, because the identity or the birthday of the prover is not
stored anywhere. The role of a *service provider* is limited to 
delivering the software and defining the terms of service.

# Business Model

The project is now in a technical demo stage. Further development of
the business model is necessary, but the flexible HarmonyOne
technology enables to integrate many variants of payment schema:

1. The service is free - the gas price on Harmony allows to offer
   similar services for free as a courtesy for members or
   customers. This is arguably not possible with Ethereum.
   
2. Verifier pays - the verifier usually benefits from the process - a
   bartender makes profit from selling drinks, therefore it is the
   most natural choice of a sponsor for the service. When a payment
   per verification is required, in can be implemented by a simple ONE
   transfer during PoAV. The payment goes to the certifier or to the
   service provider. We suggest to use the combination of the
   [Horizon, the Harmony-to-Ethereum Bridge]
   (https://bridge.harmony.one/) and the [Biance
   BUSD](https://www.binance.com/en/busd) stable coin.
   
3. Certifier pays - when payment by the certifier is required, a prepaid
   token may be used. The prover subscribes to certain number of
   validations. When a certifier sends a PoAV to the block chain, a
   smart solidity contract in executed to validate the ZK Proof and
   transfer one token from the certifier.

3. Prover pays - either direct payment is possible (the prover must
   have access to the blockchain when generating the proof) or the
   same prepaid schema can be used as with the certifier payment.

Some further ideas:

1. Paid 'Enterprise level' services for certifiers such as:

	1. prepaid service of an expert witness
	
	2. regular archiving of blockchain and cloud data secured by
       long term archive electronic signature such as B-LTA signature
       defined by European standard ETSI EN 319 142-1.

2. Private cloud repository for photos. 

3. White-list and black-listed verifiers for each prover.


# Operations

## ZK Protocol

The proof system used is the GROTH16 system designed by Jens Groth.

https://eprint.iacr.org/2016/260.pdf


This system is characterized by small proof size (just a few dozens of
bytes) which is appropriate for transfer in QR code. The system is
considered secure, the known
[vulnerability](https://medium.com/ppio/how-to-generate-a-groth16-proof-for-forgery-9f857b0dcafd)
is addressed in our design by use of prover key which is stored
together with the proof to protect the proof against any alteration.

The implementation is by the Zokrates library

https://github.com/Zokrates/ZoKrates

which enables to verify the proofs both by code written in JavaScript,
in Solidity or in Rust. The Rust interface can be called from a mobile
application via JNI.


## Services 

Two services are provided:

### Proof of Age (PoA)

Prover proves to the verifier that his birthday is less (or greater)
than certain parameter.

During certification, the certifier verifies the birthday and a
photograph of the prover. The birthday is encoded as an integer
(Julian Day). The photo is secured by computing the SHA256
cryptographical hash. A random nonce (private key) is generated to be
added to the birthday to protect the scheme against brute force
enumeration of all birthdays. Also a smart contract is deployed on
blockchain for tracking whose address is also incorporated in the proof.

Then the certifier computes a one way function from these
parameters. The result of the computation is the prover_key.

The secret parameters (nonce, birthday) are stored in plover's mobile
app memory and should be deleted from the certifier's computer after
certification. Certifier may keep a hard-copy for legal purposes.

The public parameters (photo hash, contract address and prover key)
are signed by a qualified electronic signature of the certifier or a
qualified seal and the result is uploaded together with the photo to
the cloud.

During the proving phase the ZK proof is generated. Additional public
parameters are specified by the phone user - the relation (older,
younger), current date and age difference. Both private and public
parameters are used in the computation of the proof. The proof
verifies both the age relation and the computation of the one way
function for the prover key thus gluing all the parameters together.

When the prover requests to prove an invalid relation, an invalid
proof is generated.

During verification, the QR code is verified and parsed. The contract
address is used as an address in the cloud repository to download the
photo and its signature. The qualified signature is verified using a
list of trusted root certificate authorities. The ZK proof is
validated and the result of the validation is displayed to the
verifier.

### Proof of Age Verification (PoAV)

Verifier proves to a third party (law enforcement, court) that a age validation was performed
at certain time with given results.

When the verifier validates the photo, he enters to the phone the
feedback code. OK code means that the person on the photo matches the
prover. ERR means opposite. UNK is means that the verifier cannot tell
for sure.

The code together with all the parameters of the proof are send to the
blockchain and stored forever.


# Running the code

The project is currently only a model to demonstrate the idea.  It consists of
a library written in Rust, which uses the Zokrates ZK
framework and a  collection of javascript command line
applications which model the phone app. 

The code can be either tested directly on a Linux computer or a docker
image can be created using the Dockerfile in repository root.

In the 'LegalAge' directory, there are three sub-directories called
certifier, prover, and verifier which contain the software for the particular
party. 

In each directory there is a script to test the particular function.




