import { loadRes } from '../utils/loader'

export default class Background extends cc.Node {
  bgImg :cc.Sprite = this.addComponent(cc.Sprite)
  widget :cc.Widget = this.addComponent(cc.Widget)
  

  constructor () {
    super()
    this.name = 'Background'

    this.loadBgImg()
  }

  async loadBgImg () {
    const bg: any = await loadRes('texture/background')
    this.bgImg.spriteFrame = new cc.SpriteFrame(bg)
    this.width = 1360
    this.height = 760
  }
}
