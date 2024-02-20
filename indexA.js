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
              let retryCount = 0;
              const maxRetries = 50;
      while (retryCount < maxRetries) {
        try {
          const resp2 = await fetch("https://addlivetag.com/", {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
              "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
              "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\"",
              "sec-ch-ua-mobile": "?1",
              "sec-ch-ua-platform": "\"Android\"",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "same-origin",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1",
              "cookie": "us_id=8ce0d9b891645b8162e72b76a2c8e50d; PHPSESSID=l8hakk8vsgopv8sr7bg737136o; user=xurio; ref=xurio; _ga=GA1.1.1952564566.1704787707; _fbp=fb.1.1704787706854.147812631; ref=0; _ga_JFEPJSWCC6=GS1.1.1704787706.1.1.1704789018.0.0.0",
              "Referer": "https://addlivetag.com/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
          })
          const res2 = await resp2.text()
          const startIndex = res2.indexOf('<td>1</td>')
          const endIndex = res2.lastIndexOf('<td>2</td>')
          const content = await res2.substring(startIndex, endIndex).toString()
          const linkRegex2 = /"_blank" href="(.*?)"/;
          const render = /Đang xuất video/;  
          //const long = /https:\/\/vn.shp.ee\//
          
          if (content.match(/data-id="(\d+)"/) && content.match(/user-id="([^"]+)"/)) {
          console.log("get")
          await fetch("https://addlivetag.com/api/view-video.php", {
                "headers": {
                  "accept": "application/json, text/javascript, */*; q=0.01",
                  "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
                  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\"",
                  "sec-ch-ua-mobile": "?1",
                  "sec-ch-ua-platform": "\"Android\"",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "x-requested-with": "XMLHttpRequest",
                  "cookie": `us_id=${content.match(/user-id="([^"]+)"/)[1]}; PHPSESSID=l8hakk8vsgopv8sr7bg737136o; user=xurio; ref=xurio; _ga=GA1.1.1952564566.1704787707; _fbp=fb.1.1704787706854.147812631; ref=0; _ga_JFEPJSWCC6=GS1.1.1704787706.1.1.1704794566.0.0.0`,
                  "Referer": "https://addlivetag.com/",
                  "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": `user_id=${content.match(/user-id="([^"]+)"/)[1]}&id=${content.match(/data-id="(\d+)"/)[1]}`,
                "method": "POST"
              })
           
              console.log("thanhcong")
            const lH = content.match(linkRegex2)[1]  
           const video = await lH.split("?")[0]
            console.log("video: " + video)
           const sVideo = await fetch(video)
            const rVideo = await decodeURIComponent(sVideo.url)
            const startIndex2 = rVideo.indexOf('redir=') + 'redir='.length;

// Find the index of the end of the desired substring
const endIndex2 = rVideo.indexOf('?c=share_web', startIndex2);

// Extract the desired substring using the start and end index
const tVideo = await rVideo.substring(startIndex2, endIndex2);
          const affLink = await `https://shope.ee/an_redir?origin_link=${encodeURIComponent(tVideo)}&affiliate_id=17384020006&sub_id=tagsVideo`
           const strMess = `<b>✅ Đã Gắn Video Thành Công</b> ${tagName}\n\n🚨 <i><b>Chú Ý</b>: Nếu Nhấp Link mà bị hiện <b>đen màn hình (video đã xoá)</b>. Vui lòng thoát hẳn app Shopee và thử lại!</i>\n\n<b>⏳ Tốc độ add Video từ 3-5 phút. Vui lòng chờ nha! Đừng cố gửi link thêm!</b>`
          await ctx.replyWithPhoto(`https://i.ibb.co/t4c9RLr/photo1705162180.jpg`,{caption: strMess, message_thread_id: threadID, reply_markup: {
                    inline_keyboard: [
                      /* Inline buttons. 2 side-by-side */
                      [ { text: "💯 Đến Video 💯", url: affLink }, { text: "💯 Add Live 💯", url: "https://t.me/CoNenChotDon/1464" }],
          
                      /* One button */
                      //[ { text: "❓Hướng Dẫn", url: "https://t.me/ChotDonBot" }, { text: "🔥 15 Voucher 50K", url: "https://www.facebook.com/groups/salelameofficial/"}]
                  ]
                }
           , parse_mode: "HTML"});  
           break;
              }
        if(!content.match(render)){
          const strM = ctx.message.text;
          function indexofString(str, substring) {
    var index = str.indexOf(substring);
    if (index !== -1) {
        return str.substring(index);
    } else {
        return "Substring not found in the string";
    }
          }
          var resultM = indexofString(strM, "http");
          
        
          const URLs = resultM.replace(/\n/g," ")
          console.log(URLs)
      // if (sts.length < 500) {
      //   ctx.reply(`Opps! Có vẻ như đây không phải link sản phẩm! Vui lòng kiểm tra lại nhé! ${tagName}`,{message_thread_id: threadID, parse_mode: "HTML"} )
      //   return next()
      // }
      if(URLs.length > 0) {
        console.log("haha")
   const addVideo = await fetch("https://addlivetag.com/api/add-video.php", {
      "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "us_id=8ce0d9b891645b8162e72b76a2c8e50d; ref=xurio; _ga=GA1.1.1952564566.1704787707; _fbp=fb.1.1704787706854.147812631; ref=0; PHPSESSID=gicfpeqkj9ddnq754lhpauuorm; user=xurio; _ga_JFEPJSWCC6=GS1.1.1704808576.5.1.1704808577.0.0.0",
        "Referer": "https://addlivetag.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": `user=xurio&user_id=8ce0d9b891645b8162e72b76a2c8e50d&video=${URLs}`,
      "method": "POST"
    })
    const stsAdd = await addVideo.text()
    if (stsAdd.match(/Chỉ nhận yêu cầu bằng/)) {
      ctx.reply(`Chỉ chấp nhận link tại ứng dụng Shopee (shp.ee hoặc shop.ee) ${tagName}`,{message_thread_id: threadID, parse_mode: "HTML"} )
      break;
    }
    console.log("add")

     
    }
  }

  // if(content.match(render)){
  //   const sleep = (ms) => {
  //               return new Promise(resolve => setTimeout(resolve, ms));
  //             }
  //   (async () => {
  //     console.log("Hello");
  //     await sleep(30000)
  //     console.log("world");
  //   })()
  // }
    } catch (ers) {
      console.log(ers)
      retryCount++;
    }
  }
    if (retryCount === maxRetries) {
      ctx.reply(`Máy chủ gặp sự cố trong quá trình truy xuất, hãy thử lại nhé! ${tagName}`,{message_thread_id: threadID, parse_mode: "HTML"} )
      // Handle the case when the maximum number of retries is reached
      //await ctx.deleteMessage(message.message_id); 
    }         
            
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


    
