import Background from './Background'
import Ground from './Ground'
import PlayerNode from './PlayerNode'
import Star from './Star'
import { loadRes } from '../utils/loader'

const { ccclass } = cc._decorator

@ccclass
export default class Main extends cc.Component {
  // background: Background = null
  // ground: Ground = null
  // player: PlayerNode = null
  // prefabs = {
  //   star: cc.Prefab = null
  // }

  // maxStarDuration: number = 0
  // minStarDuration: number = 0

  constructor () {
    super()
  }

  start () {
    // this.node.addChild(this.background = new Background())
    // this.node.addChild(this.ground = new Ground())
    // this.node.addChild(this.player = new PlayerNode())

    // this.prefabs.star = cc.instantiate(await loadRes('prefabs/star'))
    // this.prefabs.star.addComponent(Star)
    // this.node.addChild(this.prefabs.star)
  }
}
