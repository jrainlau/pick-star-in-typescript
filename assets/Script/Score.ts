import { loadRes } from '../utils/loader'

export default class Score extends cc.Node {
  scoreDisplay: any = this.addComponent(cc.Label)
  constructor () {
    super()
    this.y = 200
    this.init()
  }

  async init () {
    this.scoreDisplay.string = 'Score: 0'
    this.scoreDisplay.fontSize = 40
    this.scoreDisplay.font = await loadRes('font/mikado_outline_shadow', cc.Font)
    this.scoreDisplay.string = 'Score: 0'
  }

  setScore (score) {
    this.scoreDisplay.string = `Score: ${score}`
  }
}
