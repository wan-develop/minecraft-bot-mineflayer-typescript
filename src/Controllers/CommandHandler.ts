import { Bot as tBot } from 'mineflayer';


export default class CommandHandler {

  private _botEntity: tBot | undefined;

  constructor(botEntity: tBot | undefined) {
    this._botEntity = botEntity;
  }

  private _callCommand(command: string): void {
    this._botEntity?.chat(command);
  }

  public teleport(targetName: string): void {
    this._callCommand(`/tp ${this._botEntity?.username} ${targetName}`);
  }

  public kill() {
    this._callCommand(`/kill ${this._botEntity?.username}`);
  }




}