const wrapMessage = require('./wrapMessage')
const core = require('@actions/core')
const date = new Date(0).toISOString()

core.info = jest.fn()

describe("Wrap Message when using MarkdownV2", () => {
    test("wrap message input", async () => {
        const inputMessage = `
        #
        *CJ* is not _CZ_
        The abc event triggered second step.
        show the github variable ref: xyz
        show the github variable commit: 234857238947
        show the github variable ref: 123123123
        show the github variable commit: afasckh123123123
        Commit Message: ajdhasdhjhasd
        `.toString()
        const msg = await wrapMessage(inputMessage, 'MarkdownV2')
        const output = `
        #
        *CJ* is not _CZ_
        The abc event triggered second step.
        show the github variable ref: xyz
        show the github variable commit: 234857238947
        show the github variable ref: 123123123
        show the github variable commit: afasckh123123123
        Commit Message: ajdhasdhjhasd
        `
        expect(msg).toEqual(output)
    });
})

describe("Wrap Message when NOT using MarkdownV2", () => {
    test("wrap message input", async () => {
        const inputMessage = `
        *CJ* is not _CZ_
        The abc event triggered second step.
        show the github variable ref: xyz
        show the github variable commit: 234857238947
        show the github variable ref: 123123123
        show the github variable commit: afasckh123123123
        Commit Message: ajdhasdhjhasd
        `.toString()
        const msg = await wrapMessage(inputMessage, 'Markdown')
        const output = `
        *CJ* is not _CZ_
        The abc event triggered second step.
        show the github variable ref: xyz
        show the github variable commit: 234857238947
        show the github variable ref: 123123123
        show the github variable commit: afasckh123123123
        Commit Message: ajdhasdhjhasd
        `
        expect(msg).toEqual(output)
    });
})