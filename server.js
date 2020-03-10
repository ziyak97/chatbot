const dialogflow = require('dialogflow');
const uuid = require('uuid');
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/data', async (req, res) => {

  const data = await runSample(req.body.query)
  res.json({
    response: data
  })
})

async function runSample(input, projectId = 'newagent-awolbb') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: '/Users/ziyakjehangir/Desktop/dialogflow/NewAgent-d4745b6b3e1f.json'
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: input,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  // console.log('Detected intent');
  const result = responses[0].queryResult;
  // console.log(`  Query: ${result.queryText}`);
  // console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    // console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  return result.fulfillmentText
}


app.listen(3000, () => console.log(`Listening on port 3000`))