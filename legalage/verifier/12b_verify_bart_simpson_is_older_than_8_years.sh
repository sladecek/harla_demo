pushd verifier
node .   \
     --feedback 1 \
     --today 2021-01-17 \
     --qr ../../p2v/bart_simpson_is_older_than_8_years.json \
     --pki ../vpki.json \
     --wallet ../vwallet.json \
     --repo ../vrepo.json 
popd
