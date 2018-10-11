import Game from './Game'

export default class Star extends cc.Component {
  static instance: Star = null
  pickRadius: number = 60

  constructor () {
    super()
    Star.instance = this
  }

  update () {
    if (this.getPlayerDistance() < this.pickRadius) {
      this.onPicked()
      return
    }
    const opacityRatio = 1 - Game.instance.timer / Game.instance.starDuration
    const minOpacity = 50
    this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity))
  }

  getPlayerDistance () {
    const playerPosition = Game.instance.playerNode.getPosition()
    const distance = this.node.position.sub(playerPosition).mag()
    return distance
  }

  onPicked () {
    Game.instance.spawnNewStar()
    Game.instance.gainScore()
    this.node.destroy()
  }

  destroyNode () {
    this.node.destroy()
  }
}