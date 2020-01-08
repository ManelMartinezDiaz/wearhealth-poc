# Start a local blockchain
npm run env:restart
# Install the chaincode
npm run cc:start -- participant

# Start your web server
#npx lerna run start --scope server --stream
node ~/wearhealth-poc/server/server.js

# Seed some participants
hurl invoke participant participant_register gov "Big Government" -u admin
hurl invoke participant participant_register mit "MIT" -u user1 -o org1
hurl invoke participant participant_register naba "National Bank" -u user1 -o org2

