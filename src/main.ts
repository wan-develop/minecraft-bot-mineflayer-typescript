import mineflayer, { Bot as tBot } from 'mineflayer';

import { Bot } from './Classes/Bot';



const HOST = "0.0.0.0";
const PORT = 61089;

// const players: Array<string> = ["extopious", "herobrine", "notch", "rezendeevil", "link", "pedro", "mario"]

// const bots: Array<Bot> = players.map(playerName => new Bot(playerName, HOST, PORT).init());
const bots: Array<Bot> = [];

for (let i = 0; i < 20; i++) {
  bots.push(new Bot("Bot" + i, HOST, PORT).init());
  
}



