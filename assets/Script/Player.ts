import { loadRes } from '../utils/loader'
const { ccclass } = cc._decorator

@ccclass
export default class Player extends cc.Component {
  jumpHeight: number = 200
  jumpDuration: number = 0.5
  maxMoveSpeed: number = 400
  accel: number = 350
  accLeft: boolean = false
  accRight: boolean = false
  xSpeed: number = 0

  jumpAudio: any = null

  constructor () {
    super()
  }

  async onLoad () {
    this.node.runAction(this.setJumpAction())

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)

    this.jumpAudio = await loadRes('audio/jump', cc.AudioClip)
  }

  update (dt) {
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt
    } else if (this.accRight) {
      this.xSpeed += this.accel * dt
    }

    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      this.xSpeed = this.maxMoveSpeed * this.xSpeed /  Math.abs(this.xSpeed)
    }

    this.node.x += this.xSpeed * dt
  }

  setJumpAction () {
    const jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut())
    const jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn())
    const callback = cc.callFunc(this.playJumpSound, this)
    return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback))
  }

  playJumpSound () {
    cc.audioEngine.play(this.jumpAudio, false, 1)
  }

  onKeyDown (event) {
    switch(Number(event.keyCode)) {
      case 37:
        this.accLeft = true
        break
      case 39:
        this.accRight = true
        break
    }
  }

  onKeyUp (event) {
    switch(Number(event.keyCode)) {
      case 37:
        this.accLeft = false
        break
      case 39:
        this.accRight = false
        break
    }
  }
}
