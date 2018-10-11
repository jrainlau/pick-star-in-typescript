import Background from './Background'
import Ground from './Ground'
import PlayerNode from './PlayerNode'
import Star from './Star'
import Score from './Score'
import { loadRes } from '../utils/loader'

const { ccclass } = cc._decorator

@ccclass
export default class Game extends cc.Component {
  static instance: Game = null

  background: Background = null
  ground: Ground = null
  playerNode: PlayerNode = null
  starNode: any = null
  prefabStar: any = null
  scoreNode: Score = null

  maxStarDuration: number = 0
  minStarDuration: number = 0

  score: number = 0
  timer: number = 0
  starDuration: number = 3

  restart: boolean = false

  constructor () {
    super()
    Game.instance = this
  }

  async onLoad () {
    this.node.addChild(this.background = new Background())
    this.node.addChild(this.ground = new Ground())
    this.node.addChild(this.playerNode = new PlayerNode())
    this.node.addChild(this.scoreNode = new Score())
    this.starNode = await loadRes('prefabs/star')

    this.spawnNewStar()
  }

  update (dt) {
    if ((this.timer > this.starDuration)) {
      this.gameOver()
      return
    }
    this.timer += dt
  }

  async spawnNewStar (resetTimer = true) {
    this.prefabStar = cc.instantiate(this.starNode)
    this.prefabStar.addComponent(Star)
    this.node.addChild(this.prefabStar)
    this.prefabStar.setPosition(this.getNewStarPosition())
    if (resetTimer) {
      this.timer = 0
    }
  }

  getNewStarPosition () {
    let randX = 0
    const groundY = this.ground.y + this.ground.height / 2
    const randY = groundY + Math.random() * this.playerNode.getComponent('Player').jumpHeight
    const maxX = this.node.width/2
    randX = (Math.random() - 0.5) * 2 * maxX
    return cc.v2(randX, randY)
  }

  gainScore () {
    this.score += 1
    this.scoreNode.setScore(this.score)
  }

  gameOver () {
    console.log('gameover')
    this.score = 0
    this.timer = 0
    this.scoreNode.setScore(this.score)
  }
}