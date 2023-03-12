[![telegram message](https://github.com/hungran/telegram_notify_action/actions/workflows/ci.yaml/badge.svg)](https://github.com/hungran/telegram_notify_action/actions/workflows/ci.yaml)
[![docker build and push](https://github.com/hungran/telegram_notify_action/actions/workflows/release_docker.yaml/badge.svg)](https://github.com/hungran/telegram_notify_action/actions/workflows/release_docker.yaml)
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
Map Github user with Telegram user to mention in message
```yaml
jobs:
  telegram-notify:
    runs-on: ubuntu-latest
    name: Telegram Notify
    env:
      map_users: > 
        {
          "<github_user>": "@<tele_user>",
          "xxx": "@xxx"
        }
      reviewer: ""
    steps:
      - name: 'Check if PR has been opened/re-opened'
        id: opened
        if: github.event.action == 'opened' || github.event.action == 'reopened'
        run: echo "::set-output name=status::opened"
      - name: 'Check if PR have been closed'
        id: closed
        if: github.event.action == 'closed' && github.event.pull_request.merged == false
        run: echo "::set-output name=status::closed" 
      - name: 'Check if PR have been merged'
        id: merged
        if:  github.event.action == 'closed' && github.event.pull_request.merged == true
        run: echo "::set-output name=status::merged"
      - name: 'Check if PR request reviewer'
        id: review
        if: github.event.action == 'review_requested'
        run: |
          echo "::set-output name=status::requested review of"
          echo "reviewer=${{ fromJSON(env.map_users)[join(github.event.pull_request.requested_reviewers[*].login, ', ')] }}" >> $GITHUB_ENV
      - name: Notify 🐧
        uses: hungran/telegram_notify_action@master
        with:
          TELEGRAM_TO: ${{ secrets.TELEGRAM_TO }}
          TELEGRAM_TOKEN: ${{ secrets.TELEGRAM_TOKEN }}    
          message: |
            🎉 **`${{ github.actor }}`** has been ${{join(steps.*.outputs.status, ' and ')}} ${{ env.reviewer }} a Pull Request 🍻
            Repository: ${{ github.repository }}
            ${{ github.event.pull_request.html_url }}
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
