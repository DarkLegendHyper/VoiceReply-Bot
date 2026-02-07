const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('WhatsApp එකෙන් මෙම QR code එක Scan කරන්න.');
});

client.on('ready', () => {
    console.log('Bot දැන් සක්‍රීයයි! මැසේජ් ලැබෙන තෙක් බලා සිටී...');
});

// මැසේජ් එකක් ලැබුණු විට ක්‍රියාත්මක වන කොටස
client.on('message', async (msg) => {
    
    // ලැබෙන මැසේජ් එක "hi" හෝ "hello" ද කියා පරීක්ෂා කිරීම (අකුරු කුඩා කර බලයි)
    const messageBody = msg.body.toLowerCase();

    if (messageBody === 'hi' || messageBody === 'hello') {
        
        console.log(`${msg.from} වෙතින් මැසේජ් එකක් ලැබුණා. Voice reply එක යවනවා...`);

        const filePath = './media/Hello.mp3'; // ඔබ කලින් සූදානම් කරගත් Audio file එක

        if (fs.existsSync(filePath)) {
            const media = MessageMedia.fromFilePath(filePath);
            
            // මැසේජ් එක එවූ පුද්ගලයාට Voice එක යැවීම
            await client.sendMessage(msg.from, media, { sendAudioAsVoice: true });
        } else {
            console.log('වැරදියි: reply_voice.mp3 ගොනුව සොයාගත නොහැක.');
        }
    }
});

client.initialize();
