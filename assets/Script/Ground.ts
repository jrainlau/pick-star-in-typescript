import { loadRes } from '../utils/loader'

export default class Ground extends cc.Node {
  bgImg :cc.Sprite = this.addComponent(cc.Sprite)

  constructor () {
    super()
    this.name = 'Ground'

    this.loadBg()
  }

  async loadBg () {
    const bg: any = await loadRes('texture/ground')
    this.bgImg.spriteFrame = new cc.SpriteFrame(bg)
    this.width = 1360
    this.height = 160
    this.y = -240
  }
}
