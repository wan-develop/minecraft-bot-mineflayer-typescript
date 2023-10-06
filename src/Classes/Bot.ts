import mineflayer, { Bot as tBot } from 'mineflayer';
import BotController from '../Controllers/BotController';
import CommandHandler from '../Controllers/CommandHandler';



export class Bot {

    private _entity: tBot | undefined;
    private _host: string;
    private _username: string;
    private _port: number;

    private _commandHandler: CommandHandler | undefined;
    private _botController: BotController | undefined;

    get Entity() {
        return this._entity;
    }

    constructor(username: string, host: string, port: number) {

        this._username = username;
        this._host = host;
        this._port = port;

    }

    private _createBot(): void {
        this._entity = mineflayer.createBot({
            host: this._host,              // minecraft server ip
            username: this._username,      // minecraft username
            // password: '123456',         // minecraft password, comment out if you want to log into online-mode=false servers
            port: this._port,              // only set if you need a port that isn't 25565
            // version: "1.19.2",          // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
            // auth: 'mojang'              // only set if you need microsoft auth, then set this to 'microsoft'
        });
    }




    public init(): Bot {
        this._createBot();

        // this._commandHandler = new CommandHandler(this._entity);
        this._botController = new BotController(this._entity);

        this._entity?.on("chat", (username: string, message: string) => {
            if (this._username === username) return;

            if (message.includes("jump")) {
                this._botController?.jump();
            }

            if (message.includes("tpme")) {
                this._commandHandler?.teleport(username);
            }

            if (message.includes("follow")) {
                this._botController?.followPlayer(username);
            }


        });
        this._botController.jump()


        return this;
    }




}