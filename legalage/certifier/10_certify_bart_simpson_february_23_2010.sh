pushd certifier
node .   \
     --date-of-birth 2010-02-23 \
     --photo ../test-photos/Bart_Simpson_200px.png \
     --prover-db ../../c2p/bart_simpson_mobile_app_secrets.json \
     --pki ../cpki.json \
     --wallet ../cwallet.json \
     --repo ../crepo.json 
popd
