import { Bot as tBot } from 'mineflayer';
import { Player, Location } from 'mineflayer';

type Vec3 = {
    x: number;
    y: number;
    z: number;

}

export default class BotController {

    private _botEntity: tBot | undefined;

    constructor(botEntity: tBot | undefined) {
        this._botEntity = botEntity;
    }




    public jump(): void {
        this._botEntity?.setControlState?.("jump", true);
        this._botEntity?.setControlState?.("jump", false);
    }


    public getPlayerPosition(playerUsername: string): Vec3 {
        const localPlayers: any | undefined = this._botEntity?.players;
        const targetPlayer: Player = localPlayers?.[playerUsername];
        const playerPosition: Vec3 = targetPlayer.entity.position;

        playerPosition.y += 1;
        return playerPosition;

    }

    public lookAtPlayer(playerUsername: string): void {
        //@ts-ignore
        this._botEntity?.lookAt?.(this.getPlayerPosition(playerUsername));

    }

    public followPlayer(playerUsername: string, timeout: number = 10000): void {

        //Keep looking at player
        const lookAtPlayerInterval = setInterval(() => {
            this.lookAtPlayer(playerUsername);
        }, 250);

        //Keep jumping
        const playerJumpInterval = setInterval(() => {
            this.jump();
        }, 500);


        //Keep moving forward
        this._botEntity?.setControlState("forward", true);

        //Stop on timeout -> clear all intervals.
        setTimeout(() => {

            this._botEntity?.setControlState("forward", false);
            clearInterval(playerJumpInterval);
            clearInterval(lookAtPlayerInterval);
        }, timeout)

    }




}