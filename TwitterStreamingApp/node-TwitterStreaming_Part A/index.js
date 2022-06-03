const { application } = require('express')
const needle = require('needle')
const config = require('dotenv').config()
const TOKEN = process.env.TWITTER_BEARER_TOKEN


const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules'
const streamURL = 'https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id'

const rules = [{value: 'Kendrick Lamar'}]

//get stream rules
async function getRules() {
    const response = await needle('get', rulesURL, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    })
    return response.body
}

//set stream rules
async function setRules() {
    const data = {  //data that is going to be passed in the post request
        add: rules //remember we created a rule array with the value kendrick lamar, here is where I use it to set the rules
    }

    const response = await needle('post', rulesURL, data,{ //it will be a post request because we are setting the rules
        headers: {
            'content-type' : 'application/json', //to set the type of data we're passing i.e json
            Authorization: `Bearer ${TOKEN}`
        }
    })
    return response.body
}


//delete stream rules
async function deleteRules(rules) { //we pass in rules
   //to make sure rules.data is an array
   if(!Array.isArray(rules.data)) {
       return null
   } //so if its not an array, we return null
   
   //as far as the data we are sending, instead of add its going to be delete
   //instead of rules its going to be an object which is an array of ids
   //the rules object is stored with ids, we're going to extract these ids from the array
   //so i define a varriable called ids
   
   const ids = rules.data.map((rule) => rule.id) //this just gets specificaly the id of the array

   const data = {  
       delete: {    
           ids: ids
        }
   }

    const response = await needle('post', rulesURL, data,{ 
        headers: {
            'content-type' : 'application/json',
            Authorization: `Bearer ${TOKEN}`
        }
    })
    return response.body
}

function streamTweets () {
    //we need to make a request to the stream url
    //the variable below
    const stream = needle.get(streamURL, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    })
    //The above will give a stream

    stream.on('data', (data) => {
        try {
            const json = JSON.parse(data)
            console.log(json)
        } catch(error) {

        }
    })
}


(async () => {
    let currentRules

    try {
        
        currentRules = await getRules()
        await deleteRules(currentRules)
        await setRules()
    }

    catch (error){
        console.error(error)
        process.exit(1)
    }

    streamTweets() //call the streamTweets function
}) ()