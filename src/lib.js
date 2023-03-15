/* eslint-disable no-undef */
const core = require('@actions/core')
const TelegramBot = require('node-telegram-bot-api')
const wrapMessage = require('./wrapMessage')

const groupId = core.getInput('TELEGRAM_TO') || process.env.TELEGRAM_TO
const message = core.getInput('message').toString() || process.env.MESSAGE.toString() || "abcxyz"
const parse_mode = core.getInput('parse_mode') || "MarkdownV2"
const bot = new TelegramBot((core.getInput('TELEGRAM_TOKEN')).toString() || process.env.TELEGRAM_TOKEN.toString(), { polling: false })

exports.run = async () => {
  try {
    if(!groupId) {
      throw new Error('no groupId have been provided. Exiting.')
    }
    if(!parse_mode) {
      throw new Error('no parse_mode have been provided.Should be: Markdown | MarkdownV2 | HTML. Exiting.')
    }
    if(!message) {
      throw new Error('no message found. Exiting')
    }
    const msg = await wrapMessage(message, parse_mode)
    sendMessage(groupId, msg, parse_mode)
  } catch (e) {
    core.setFailed(e)
  }
}

const sendMessage = async (groupId, msg, parse_mode) => {
  core.startGroup(`Attempting to send message to ${groupId}`)
  try {
    const rs = await bot.sendMessage(groupId, msg, {parse_mode : `${parse_mode}`})
    return rs 
  } catch (e) {
    throw new Error(`error sending message to ${groupId} - ${e}`)
  }
}
