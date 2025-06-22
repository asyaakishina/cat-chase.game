from flask import Flask, request, render_template
import telebot
import os

app = Flask(__name__)
TOKEN = '8017577306:AAHjVLM_gZa-eL_CSRxCtcnA-LS9Dv5GNQM'
bot = telebot.TeleBot(TOKEN)

@app.route('/')
def index():
    return "Бот работает!"

@app.route('/' + TOKEN, methods=['POST'])
def getMessage():
    bot.process_new_updates([telebot.types.Update.de_json(request.stream.read().decode("utf-8"))])
    return "!", 200

@app.route('/start')
def webhook():
    bot.remove_webhook()
    bot.set_webhook(url='https://yourdomain.ru/'  + TOKEN)
    return "Webhook установлен!", 200

@bot.message_handler(commands=['start'])
def start(message):
    user_name = message.from_user.first_name
    markup = telebot.types.InlineKeyboardMarkup()
    btn_game = telebot.types.InlineKeyboardButton("Играть", web_app=telebot.types.WebAppInfo(url="https://asyaakishina.github.io/cat-chase.game/")) 
    markup.add(btn_game)
    bot.send_message(message.chat.id, f"Привет, {user_name}!\nДавай проверим твои знания английского языка", reply_markup=markup)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get('PORT', 5000)))