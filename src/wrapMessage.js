/* eslint-disable no-useless-escape */
// eslint-disable-next-line no-undef
// https://www.npmjs.com/package/telegramify-markdown
const telegramifyMarkdown = require('telegramify-markdown');
module.exports = async function (message, parse_mode) {
    if(!message) {
        throw new Error('no message found. Exiting')
    }
    if(parse_mode != "MarkdownV2") {
        return message
    }
    const escapeMarkdownV2 = (message) => {
        // Функция telegramifyMarkdown не совсем корректно работает, глючит с форматом __Underlined__,
        // поэтому обходим этот глюк с помощью замены "__" на "@@" и обратно.
        const dogText = message.replace(/__/gi, '@@');
    
        const lines = dogText.split('\n');
        const percentText = lines.map(line => {
            return line.startsWith('*') && line.endsWith('*')
                ? '%%' + line.substring(1, line.length - 1) + '%%'
                : line
        }).join('\n');
    
        const mdEscapedText = telegramifyMarkdown(percentText);
        const undog = mdEscapedText.replace(/@@/gi, '__');
    
        return undog.replace(/%%/gi, '*');
    }
    return escapeMarkdownV2(message)   
}