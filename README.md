# 🚀 Telegram for GitHub Actions

[GitHub Action](https://github.com/features/actions) for sending a Telegram notification message.

## Usage

**NOTE**: If you are getting "Error: Chat not found", then you need to look at this stackoverflow's answer [here](https://stackoverflow.com/a/41291666).

Send custom message and see the custom variable as below.

```yml
with:
    TELEGRAM_TO: ${{ secrets.TELEGRAM_TO }}
    TELEGRAM_TOKEN: ${{ secrets.TELEGRAM_TOKEN }}
    # parse_mode: MarkdownV2 (Optional: Markdown, MarkdownV2, HTML)
    message: |
    *CJ* is not _CZ_
    The ${{ github.event_name }} event triggered second step.
    show the github variable ref: ${{ github.ref }}
    show the github variable commit: ${{ github.sha }}
    show the github variable ref: {{ commit.ref }}
    show the github variable commit: {{ commit.sha }}
    Commit Message: ${{ github.event.head_commit.message }}
```

Remove `args` to send the default message.

```yml
- name: send default message
  uses: appleboy/telegram-action@master
  with:
    to: ${{ secrets.TELEGRAM_TO }}
    token: ${{ secrets.TELEGRAM_TOKEN }}
```

## Secrets

Getting started with [Telegram Bot API](https://core.telegram.org/bots/api).

* `TELEGRAM_TO`:  Unique identifier for this chat.
* `TELEGRAM_TOKEN`: Telegram authorization token.

How to get unique identifier from telegram api:

```bash
curl https://api.telegram.org/bot<token>/getUpdates
```


## Template variable

| Github Variable   | Telegram Template Variable |
|-------------------|----------------------------|
| GITHUB_REPOSITORY | repo                       |
| GITHUB_ACTOR      | repo.namespace             |
| GITHUB_SHA        | commit.sha                 |
| GITHUB_REF        | commit.ref                 |
| GITHUB_WORKFLOW   | github.workflow            |
| GITHUB_ACTION     | github.action              |
| GITHUB_EVENT_NAME | github.event.name          |
| GITHUB_EVENT_PATH | github.event.path          |
| GITHUB_WORKSPACE  | github.workspace           |