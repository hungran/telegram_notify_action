package main

import (
	// "context"
	"fmt"
	"log"
	"strconv"

	"github.com/actions-go/toolkit/core"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

type Telegram struct {
	token      string
	id         int64
	parse_mode string
	message    string
}

func wrapTelegram() *Telegram {
	token, err := core.GetInput("TELEGRAM_TOKEN")
	if !err {
		fmt.Printf("Error to get Input: TELEGRAM_TOKEN")
	}
	raw_id, err1 := core.GetInput("TELEGRAM_TO")
	if !err1 {
		fmt.Printf("Error to get Input: TELEGRAM_TO")
	}
	parse_mode, err2 := core.GetInput("parse_mode")
	if !err2 {
		fmt.Printf("Error to get Input: parse_mode")
	}
	raw, err3 := core.GetInput("message")
	if !err3 {
		fmt.Printf("Error to get Input: message")
	}
	id, err4 := strconv.ParseInt(raw_id, 10, 64)
	if err4 != nil {
		core.Error("Error when convert id to int64")
	}
	message := tgbotapi.EscapeText(parse_mode, raw)
	T := Telegram{token: token}
	T.id = id
	T.parse_mode = parse_mode
	T.message = message
	return &T
}

func main() {
	Telegram := wrapTelegram()
	bot, err := tgbotapi.NewBotAPI(Telegram.token)
	if err != nil {
		log.Panic(err)
	}
	bot.Debug = false
	msg := tgbotapi.NewMessage(Telegram.id, Telegram.message)
	bot.Send(msg)
}
