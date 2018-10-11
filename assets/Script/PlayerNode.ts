import helper from '../utils/helper'
import Player from './Player'
import { loadRes } from '../utils/loader';

const { ccclass } = cc._decorator

@ccclass
@helper(true)
export default class PlayerNode extends cc.Node {
  player: Player = this.addComponent(Player)
  bgImg: cc.Sprite = this.addComponent(cc.Sprite)

  constructor () {
    super()
    this.name = 'Player'

    this.loadPlayer()
  }

  async loadPlayer () {
    const player: any = await loadRes('texture/PurpleMonster')
    this.bgImg.spriteFrame = new cc.SpriteFrame(player)
    this.y = -50
  }
}
