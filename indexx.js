import express from "express";
import { Bot,webhookCallback } from "grammy";
import fetch from "node-fetch"
import {} from 'dotenv/config'
const bot = new Bot(process.env.BOT_TOKEN);


// huong dan
bot.command('start', async (ctx) => {
  const chatId = ctx.message.chat.id
  if (chatId != "-1001959268889") {
    ctx.replyWithPhoto("https://i.imgur.com/KeA0dm9.png", {caption: `<i><b>Để sử dụng được công cụ - Bạn làm theo các bước sau đây!</b></i>
    \n<b>Bước 1:</b> Tìm đến trang sản phẩm bạn muốn truy vấn.
    \n<b>Bước 2:</b> Nhấn nút chia sẻ sản phẩm (như hình) và copy link chia sẻ sản phẩm.
    \n<b>Bước 3:</b> Tham gia group https://t.me/CoNenChotDon và paste link sản phẩm vô Giỏ Video, rồi ấn Gửi.
    \n<b>Bước 4:</b> Chờ đợi máy chủ hoàn thành add giỏ live!!`, parse_mode: "HTML"})
  } 
});
  

bot.on('message', async (ctx, next) => {
  const chatId = ctx.message.chat.id
      const threadID = ctx.message.message_thread_id
    const fromID = ctx.message.from.id
    const lastName = (ctx.message.from.last_name == undefined) ? "":ctx.message.from.last_name;
    const fullName = `${ctx.message.from.first_name} ${lastName}`
    // const messID = ctx.message.message_id
    console.log(chatId + " - " + fromID) 
    const tagName = `<a href="tg://user?id=${fromID}">${fullName}</a>`
    if (chatId == "5229925261" || chatId == "-1001959268889" && threadID == "14113") {
        const message = ctx.message.text;
        const linkRegex = /(https?:\/\/[^\s]+)/;
        const pee = /https:\/\/sh/;
        if (linkRegex.test(message)) {
            const url = message.match(linkRegex)[0]
            if (pee.test(url)){
          await ctx.replyWithPhoto(`https://shopgarena.net/wp-content/uploads/2023/07/Meo-Xin-Loi-Hai-Huoc.jpg`,{caption: "<b>Add Video đã bị khóa tính năng, nếu tài khoản của bạn còn có thể add Video hãy giúp mọi người ở đây nhé!</b> \n<b><i>Tất cả đều miễn phí! Hoa hồng là của bạn! 🎉</i></b>", message_thread_id: threadID, reply_markup: {
                    inline_keyboard: [
                      /* Inline buttons. 2 side-by-side */
                      [ { text: "💯 Đến Video 💯", url: affLink }, { text: "💯 Add Live 💯", url: "https://t.me/CoNenChotDon/1464" }],
          
                      /* One button */
                      //[ { text: "❓Hướng Dẫn", url: "https://t.me/ChotDonBot" }, { text: "🔥 15 Voucher 50K", url: "https://www.facebook.com/groups/salelameofficial/"}]
                  ]
                      }
           , parse_mode: "HTML"});  
           
            }
        }
    }
    })
        
    
    
 
    if (process.env.NODE_ENV === "production") {
      const app = express();
      app.use(express.json());
      app.use(webhookCallback(bot, "express"));
    
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Bot listening on port ${PORT}`);
      });
    } else {
      bot.start();
    }
  
    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));


    
