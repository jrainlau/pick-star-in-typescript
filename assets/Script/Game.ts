import Background from './Background'
import Ground from './Ground'
import PlayerNode from './PlayerNode'
import Star from './Star'
import { loadRes } from '../utils/loader'

const { ccclass } = cc._decorator

@ccclass
export default class Game extends cc.Component {
  background: Background = null
  ground: Ground = null
  playerNode: PlayerNode = null
  prefabStar: any = null

  maxStarDuration: number = 0
  minStarDuration: number = 0

  constructor () {
    super()
  }

  async start () {
    this.node.addChild(this.background = new Background())
    this.node.addChild(this.ground = new Ground())
    this.node.addChild(this.playerNode = new PlayerNode())

    this.prefabStar = cc.instantiate(await loadRes('prefabs/star'))
    this.prefabStar.addComponent(Star)

    // this.prefabs.star = cc.instantiate(await loadRes('prefabs/star'))
    // this.prefabs.star.addComponent(Star)
    // this.node.addChild(this.prefabs.star)
  }
}