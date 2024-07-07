const { google } = require('googleapis');
const readline = require('readline');

// Gmail API credentials
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'token.json';

// Replace with your own client ID, client secret, and redirect URI
const CLIENT_ID = 'enter-client-id';
const CLIENT_SECRET = 'enter-client-secret';
const REDIRECT_URI = 'http://localhost';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Function to get and store the access token
function getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            require('fs').writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            listEmails(oAuth2Client);
        });
    });
}

// Function to list the last 200 emails
function listEmails(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    gmail.users.messages.list(
        {
            userId: 'me',
            maxResults: 200,
        },
        (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const messages = res.data.messages;
            if (messages.length) {
                console.log('Emails:');
                messages.forEach((message) => {
                    gmail.users.messages.get(
                        {
                            userId: 'me',
                            id: message.id,
                            format: 'metadata',
                            metadataHeaders: ['From', 'Subject'],
                        },
                        (err, res) => {
                            if (err) return console.log('Error getting message details: ' + err);
                            const headers = res.data.payload.headers;
                            const sender = headers.find((header) => header.name === 'From').value;
                            const subject = headers.find((header) => header.name === 'Subject').value;
                            console.log(`Sender: ${sender} | Subject: ${subject}`);
                        }
                    );
                });
            } else {
                console.log('No emails found.');
            }
        }
    );
}

// Check if we have previously stored a token
require('fs').readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
    listEmails(oAuth2Client);
});

module.exports = { listEmails };