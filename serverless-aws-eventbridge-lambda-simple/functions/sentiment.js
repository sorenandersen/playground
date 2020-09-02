const AWS = require('aws-sdk')
const comprehend = new AWS.Comprehend()
const Log = require('@dazn/lambda-powertools-logger')

module.exports.handler = async (event) => {
  Log.debug('sentiment event', event)
  try {
    const params = {
      LanguageCode: event.detail.language,
      Text: event.detail.data,
    }
    const sentiment = await comprehend.detectSentiment(params).promise()
    Log.debug('Sentiment', { Sentiment: sentiment.Sentiment })
  } catch (error) {
    Log.error('detectSentiment error', { error })
  }
  return {
    success: true,
  }
}
