module.exports = function (message) {
    if(!message) {
        throw new Error('no message found. Exiting')
    }
    const r = message.toString()
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

// module.aa = function (message) {
//   try {
//     if(!message) {
//         throw new Error('no message found. Exiting')
//     }
//     return message
//         .replace(/\_/g, '\\_')
//         .replace(/\*/g, '\\*')
//         .replace(/\[/g, '\\[')
//         .replace(/\]/g, '\\]')
//         .replace(/\(/g, '\\(')
//         .replace(/\)/g, '\\)')
//         .replace(/\~/g, '\\~')
//         .replace(/\`/g, '\\`')
//         .replace(/\>/g, '\\>')
//         .replace(/\#/g, '\\#')
//         .replace(/\+/g, '\\+')
//         .replace(/\-/g, '\\-')
//         .replace(/\=/g, '\\=')
//         .replace(/\|/g, '\\|')
//         .replace(/\{/g, '\\{')
//         .replace(/\}/g, '\\}')
//         .replace(/\./g, '\\.')
//         .replace(/\!/g, '\\!')
//     } catch (e) {
//     core.setFailed(e)
//     }
// }
