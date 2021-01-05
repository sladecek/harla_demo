% LegalAge
% Ladislav Sládeček ladislav.sladecek@gmail.com
% 17.01.2020 (version 1.0)

# Introduction

*LegalAge* is a mobile application for age verification in
zero-knowledge.  Neither the service nor the verifier knows the
age of the prover but together they can prove that the prover is
older (or younger) than certain age.

The application was created mainly as a demo for zero-knowledge
technologies. It is not guaranteed that it can be of any usefullness
in any practical situation.

Imagine a  young-looking woman, who wants to order an alcoholic
beverage in a bar. In order to prove its age to the barkeeper, she
must show her ID with a name (and possibly an address) exposing
herself to the danger of stalking. Using our application, she can
prove the age anonymously instead. Similarly, an old-looking student
may want to get anonymously a discounted admission to a museum or a
good-looking lady in her seventies wants to get a discount for people
over fifty without telling her real age. The use of the application
for verifying the age of consent for sexual activities is left on the
phantasy of the reader.

The application works with four parties: the *prover* is the person
who wants to prove their age. Entering the bar, they start the
application on their phone to generate a cryptographical proof in a
form of QR code which they then present to the *verifier* (for example
the bartender). The verifier scans the code with his own phone.

The verifier's application calls a *service* which checks both the
idenity of the verifier and the identity of the prover. If the
verifier is allowed to validate the proof and the proof is correct,
the service sends to the prover a photograph of the prover. The
bartender checks the photograph and if it matches the person in front
of him, sells them the drink.

Neither the QR code, nor the service contains the knowledge of the age
of the prover. Only a zero-knowledge proof that the age is greater (or
less) than certain limit is provided. The QR code does not even reveal
the identity of the prover to the verifier, both the identity of the
prover and the proof itself are encrypted and are decrypted by the
service only to trusted provers.

The final party is a *certifier*. Certifier is someone who is trusted
by both the service and the prover. The prover must verify the age of
the prover and their photographs. It is assumed that certification
will be provided for free as a part of some other activity which
requires age verifiction. For example an university can certify the
age of all its students using enrolment data and their student ID
photographs. Or a retail organization can certify its customer when
issuing a loyality card.

What happens when someone cheats? For example when the police enters
the bar a finds an intoxicated underaged girl who proved her age using
the phone stolen from her older sister?

The barkeeper can, in this case, request from the service a document
which proves that the age of the person has been checked.  The
document contains all the details of the proof and the certification
and also the terms of service signed by the prover and is signed with
a qualified electronic signature to be be used as a proof in a
court. The document proves that the prover has abused an electronic
system for a illegal activity which is usually a criminal offense. The
police has always the right to examine the real identity of the
malicious prover who is now in a much bigger trouble than underage
drinking.

Moreover the verifier can show to the court the usage statistics of
the service which proves that the age of the visitors of the
bar is being verified regularly and only ocassional errors and abuse
may happen. 






https://www.juridicainternational.eu/?id=15689


https://www.thispersondoesnotexist.com/

POC motivation.

# Protocol

##  Participants
4 participants.

### Prover
### Verifier
### Service
### Certifier


## Pieces of Information


## ZK Protocol

### Security Assumptions
	
- not Certifier cannot generate a proof.
- Service does not know the age.
- Service cannot generate a proof.
- Only authorised prover can validate a proof.
- Only authorised prover can see a photograph.
- Certifier has some way to verify the age (personal ID). The
  certifier can archive identification info about the Prover for its
  own legal protection but does it outside the service.
- The identity of the Prover cannot be uncovered by a third party
  eavesdroping on the commnunication between the Prover and the
  Verifier. In other words, the QR code does not contain uncovered
  identification of the Prover.

### Proof Variables and Proof Circuit

# QR Code Specification
# WS API Specification
	
Pointer to openapi.json


# Mobile Application

## User Interface
### Registration Wizard
### Prove Tab
### Check Tab
### History Tab
#### Context Menu
  * Report Abuse
  * Case Report
### Application Menu
  * Unregister from Service
  * History Report
  * Set Verifier Key

#### PRO Verifier 
* Scan API Key
* Unregister
* Transfer to other device



## Technology

## Persistent Data
* birthday
* private key
* photo hash
* API key
### Initialization

# Web Service



## Technology
## Persistent Data

Subject is either Prover, Verifier, Certifier.


# Signing Application

Desktop application. Can sign documents by PKI key. 

## Technology

Not important (ws api). Integration to existing system.
PKI signature (card, HSM).

## User Interface
### Verifier Registration
* form elements such as organization name, address, e-mail
* legal header
  - version of conditions
  - hash of conditions
  - date and time of signature
* everything in JSON
* signed by CAdES
* returning API KEY
### Certifier Registration
### Request lost API key
signed CAdES
### Certify Prover
* prover says
   - userID
   - date of birth
   - mask
* certifier sends userID
   - obtains public key hash + photos + photo hash
* verification
   - photo and reconstructed key
* certier sends 
   - status
   - maybe photo
   - signed json containing
      - legal ref
	  - user ID
	  - photo hash
	  - key
  
## Persistent Data
* API key
*private key

### Initialization
# TODOs

- device Id
