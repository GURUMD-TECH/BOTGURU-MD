
let DataPack = require('sew-queen-pro');
let SewQueen = require('sew-queen-pro/sources/dc/handler');
let Details = require('sew-queen-pro/sources/dc/Details');
let {sendMessageBestEditor} = require('sew-queen-pro/sources/dc/cmd/eeditor')
let { MessageType, MessageOptions, Mimetype, GroupSettingChange, ChatModification, WAConnectionTest, WA_DEFAULT_EPHEMERAL } = require('@ravindu01manoj/sew-queen-web');
let fs = require('fs');
let os = require('os');
let ffmpeg = require('fluent-ffmpeg');
let exec = require('child_process').exec;
let axios = require('axios');
let got = require('got');
let {execFile} = require('child_process');
let cwebp = require('cwebp-bin');
let DataHelp = DataPack.constdata
let WorkType = Details.WORKTYPE == 'public' ? false : true
const request = require('request');
const deepai = require('deepai');
deepai.setApiKey(Details.DEEPAI);
let { SendMessageImage } = require('sew-queen-pro/sources/dc/cmd/dl')
const Dsew = DataHelp.dataGet('deepai'); 
const DATA = DataHelp.dataGet('conventer');
var noAPI = ''
if (Details.LANG == 'SI') {
  noAPI = '*DeepAI API Key එකක් ඇතුලත් කර නැත!*'
} else {
  noAPI = '*DeepAI API Key Not Found!*'
}
const BBsew = DataHelp.dataGet('memes');
const memeMaker = require('meme-maker')
    SewQueen['IntroduceCMD']({pattern: 'meme ?(.*)', fromMe: WorkType, desc: BBsew.MEMES_DESC}, (async (message, input) => {    

        if (message.reply_message === false) return await message.client.sendMessage(message.jid,BBsew.NEED_REPLY, MessageType.text);
        var topText, bottomText;
        if (input[1].includes(';')) {
            var split = input[1].split(';');
            topText = split[1];
            bottomText = split[0];
        }
	    else {
            topText = input[1];
            bottomText = '';
        }
    
	    var info = await message.reply(BBsew.DOWNLOADING);
	
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        }); 
    
	    memeMaker({
            image: location,         
            outfile: 'sew-meme.png',
            topText: topText,
            bottomText: bottomText,
        }, async function(err) {
            if(err) return;
            await SendMessageImage(message, fs.readFileSync('sew-meme.png'), '*' + Details.CPK + '*');
            await info.delete();    
        });
    }));

    SewQueen['IntroduceCMD']({pattern: 'faceai$', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true }, (async (message, input) => {

        var image_an = await DataPack.face()
        var webimage = await axios.get(image_an, {responseType: 'arraybuffer'})
        await SendMessageImage(message,Buffer.from(webimage.data), Details.CPK)
    }));
    SewQueen['IntroduceCMD']({pattern: 'animai', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true }, (async (message, input) => {

        var anim_img = await DataPack.anime()
        var IMGWADATA = await axios.get(anim_img, {responseType: 'arraybuffer'})
        await SendMessageImage(message,
            Buffer.from(IMGWADATA.data),
            Details.CPK
        )
    }));
    SewQueen['IntroduceCMD']({pattern: 'colorai$', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true}, (async (message, input) => {

        if (!Details.DEEPAI) return await message.sendMessage(noAPI);   
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');
        var downloading = await message.client.sendMessage(message.jid,'Colorizing.. 🎨',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("colorizer", {
                    image: fs.createReadStream("./output.jpg"),
                });
                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })
                await SendMessageImage(message,Buffer.from(respoimage.data), Details.CPK)
            });
            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
    SewQueen['IntroduceCMD']({pattern: 'waifuai$', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true}, (async (message, input) => {

        if (!Details.DEEPAI) return await message.sendMessage(noAPI);
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');
        var downloading = await message.client.sendMessage(message.jid,'Mixing.. 🧩',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("waifu2x", {
                    image: fs.createReadStream("./output.jpg"),
                });
                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })
                await SendMessageImage(message,Buffer.from(respoimage.data),Details.CPK)
            });
            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
    SewQueen['IntroduceCMD']({pattern: 'superai$', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true}, (async (message, input) => {

        if (!Details.DEEPAI) return await message.sendMessage(noAPI);  
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');
        var downloading = await message.client.sendMessage(message.jid,'Enhancing.. 🖌️',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("torch-srgan", {
                    image: fs.createReadStream("./output.jpg"),
                });
                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })
                await SendMessageImage(message,Buffer.from(respoimage.data),Details.CPK)
            });
            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
    SewQueen['IntroduceCMD']({pattern: 'moodai ?(.*)', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true}, (async (message, input) => {

        if (!Details.DEEPAI) return await message.sendMessage(noAPI);
        if (input[1] === '') return await message.sendMessage(Dsew.TEXT);
        var msgdata = await DataPack.mood(input[1], Details.DEEPAI)
        var resp = await deepai.callStandardApi("sentiment-analysis", {
            text: msgdata,
        });
        await message.reply(`*Mood:* ${resp.output}`);
    }));
    SewQueen['IntroduceCMD']({pattern: 'dreamai$', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true}, (async (message, input) => {

        if (!Details.DEEPAI) return await message.sendMessage(noAPI);
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');
        var downloading = await message.client.sendMessage(message.jid,'Starry Night.. 🌃',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("deepdream", {
                    image: fs.createReadStream("./output.jpg"),
                });
                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })
                await SendMessageImage(message,Buffer.from(respoimage.data),Details.CPK)
            });
            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
    SewQueen['IntroduceCMD']({pattern: 'neuraltalkai$', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true}, (async (message, input) => {

        if (!Details.DEEPAI) return await message.sendMessage(noAPI);
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');
        var downloading = await message.client.sendMessage(message.jid,'Reading.. 🙇🏻',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("neuraltalk", {
                    image: fs.createReadStream("./output.jpg"),
                });
                await message.reply(`*Output:* ${resp.output}`);
            });
            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
    SewQueen['IntroduceCMD']({pattern: 'ttiai ?(.*)', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true}, (async (message, input) => {

        if (!Details.DEEPAI) return await message.sendMessage(noAPI);
        if (input[1] === '') return await message.sendMessage(Dsew.TEXT);
        var msg_tt = await DataPack.tti(input[1], Details.DEEPAI)
        var resp = await deepai.callStandardApi("text2img", {
            text: msg_tt,
        });
        var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })
        await SendMessageImage(message,Buffer.from(respoimage.data),Details.CPK)
    }));
    SewQueen['IntroduceCMD']({pattern: 'toonai$', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true}, (async (message, input) => {

        if (!Details.DEEPAI) return await message.sendMessage(noAPI);
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');
        var downloading = await message.client.sendMessage(message.jid,'Tooning.. 🌟',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("toonify", {
                    image: fs.createReadStream("./output.jpg"),
                });
                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })
                await SendMessageImage(message,Buffer.from(respoimage.data), MessageType.image, Details.CPK)
            });
            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
    SewQueen['IntroduceCMD']({pattern: 'nudityai$', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true}, (async (message, input) => {

        if (!Details.DEEPAI) return await message.sendMessage(noAPI);
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');
        var downloading = await message.client.sendMessage(message.jid,'Finding NSFW.. 🔥',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("content-moderation", {
                    image: fs.createReadStream("./output.jpg"),
                });
                await message.client.sendMessage(message.jid, `*Output:* ${resp.output.nsfw_score}`, MessageType.text, { quoted: message.data });
            });
            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
    SewQueen['IntroduceCMD']({pattern: 'textai ?(.*)', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true}, (async (message, input) => {

        if (!Details.DEEPAI) return await message.sendMessage(noAPI);
        if (input[1] === '') return await message.sendMessage(Dsew.TEXT);
        var text_ai = await DataPack.text(input[1], Details.DEEPAI)
        var resp = await deepai.callStandardApi("text-generator", {
            text: text_ai
        });
        await message.client.sendMessage(message.jid, `*Article:*\n ${resp.output}`, MessageType.text, { quoted: message.data });
    }));
    SewQueen['IntroduceCMD']({pattern: 'ganstyle$', fromMe: WorkType, delownsewcmd: false, dontAdCommandList: true}, (async (message, input) => {

        if (!Details.DEEPAI) return await message.sendMessage(noAPI);
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');
        var downloading = await message.client.sendMessage(message.jid,'Creating.. ♻️',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("fast-style-transfer", {
                    style: Details.GANSTYLE,
                    content: fs.createReadStream("./output.jpg"),
                });
                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })
                await SendMessageImage(message,Buffer.from(respoimage.data), Details.CPK)
            });
            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
    

    SewQueen['IntroduceCMD']({pattern: 'x4mp4', fromMe: WorkType, dontAdCommandList: true}, (async (message, input) => {    

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid,'```Editing..```',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .withSize('25%')
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {caption: '*' + Details.CPK + '*'});
            });
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));

    SewQueen['IntroduceCMD']({pattern: 'x2mp4', fromMe: WorkType, dontAdCommandList: true}, (async (message, input) => {    

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid,'```Editing..```',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
           },
            message: message.reply_message.data.quotedMessage
        });

       ffmpeg(location)
            .withSize('50%')
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {caption: '*' + Details.CPK + '*'});
            });
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));

    SewQueen['IntroduceCMD']({pattern: 'mp4image', fromMe: WorkType, dontAdCommandList: true}, (async (message, input) => {    

        if (message.reply_message === false) return await message.sendMessage('*Need Photo!*');
        var downloading = await message.client.sendMessage(message.jid,'```Converting..```',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .loop(6)
            .fps(19)
            .videoBitrate(400)
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg, caption: '*' + Details.CPK + '*'});
            });
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));

    SewQueen['IntroduceCMD']({pattern: 'spectrum', fromMe: WorkType, dontAdCommandList: true}, (async (message, input) => {    

        if (message.reply_message === false) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid,'```Converting..```',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter_complex", "[0:a]showspectrum=s=720x1280,format=yuv420p[v]", "-map", "[v]", "-map 0:a"])
            .sa
