const AWS = require('aws-sdk')
const translate = new AWS.Translate()
const Log = require('@dazn/lambda-powertools-logger')

module.exports.handler = async (event) => {
  Log.debug('translate event', event)
  try {
    let params = {
      SourceLanguageCode: 'auto',
      TargetLanguageCode: event.detail.language,
      Text: event.detail.data,
    }
    let translation = await translate.translateText(params).promise()
    Log.debug('TranslatedText', { TranslatedText: translation.TranslatedText })
  } catch (error) {
    Log.error('translateText error', { error })
  }
  return {
    success: true,
  }
}
