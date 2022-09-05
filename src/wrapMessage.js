/* eslint-disable no-useless-escape */
// eslint-disable-next-line no-undef
exports.wrapMessage = async (message, parse_mode) => {
    if(!message) {
        throw new Error('no message found. Exiting')
    }
    if(parse_mode != "MarkdownV2") {
        return message
    }
    const r = await message.toString()
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\~/g, '\\~')
    .replace(/\>/g, '\\>')
    .replace(/\#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/\-/g, '\\-')
    .replace(/\=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\./g, '\\.')
    .replace(/\!/g, '\\!')
    return r     
}
