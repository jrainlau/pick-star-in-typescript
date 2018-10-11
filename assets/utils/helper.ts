class RectArea extends cc.Node {
  shape: cc.Graphics = this.addComponent(cc.Graphics)
  instance: any = null

  constructor (instance) {
    super()
    this.name = 'RectArea'
    this.instance = instance
    this.opacity = 100
    this.setRect()
  }

  setRect () {
    const { width, height } = this.instance
    this.shape.fillColor = new cc.Color(255, 255, 255, 100)
    this.shape.fillRect(-(width / 2), -(height / 2), width, height)
    this.shape.strokeColor = cc.Color.WHITE
    this.shape.stroke()
  }
}

class InfoBox extends cc.Node {
  shape: cc.Graphics = this.addComponent(cc.Graphics)
  instance: any = null

  constructor (instance) {
    super()
    this.name = 'InfoBox'
    this.instance = instance
    this.opacity = 100
    this.setRect()
  }

  setRect () {
    const { width, height } = this.instance
    this.shape.fillColor = new cc.Color(0, 255, 255, 100)
    this.shape.fillRect(-(width / 2), (height / 2), 100, 60)
    this.shape.strokeColor = cc.Color.WHITE
    this.shape.stroke()
  }
}

class Info extends cc.Node {
  text: cc.Label = this.addComponent(cc.Label)
  instance: any = null

  constructor (instance) {
    super()
    this.name = 'Info'
    this.instance = instance
    this.setInfo()
  }

  setInfo () {
    const { x, y, width, height } = this.instance
    this.x = -(width / 2) + 20
    this.y = (height / 2) + 30
    this.text.string = `
      x: ${x.toFixed(2)}
      y: ${y.toFixed(2)}
      width: ${width}
      height: ${height}
    `
    this.text.fontSize = 12
    this.text.lineHeight = 14
  }

  updateInfo (detail) {
    this.text.string = `
      x: ${detail.x.toFixed(2)}
      y: ${detail.y.toFixed(2)}
      width: ${this.instance.width}
      height: ${this.instance.height}
    `
  }
}

export default function helper (devMode: boolean) {
  return function (target): any {
    return class extends target {
      rectArea: RectArea = null
      infoBox: InfoBox = null
      info: Info = null
      dragable: boolean = false
  
      constructor () {
        super()
        this.name = target.name
        
        if (devMode) {
          this.on('mouseenter', () => {
            this.addChild(this.rectArea = new RectArea(this))
            this.addChild(this.infoBox = new InfoBox(this))
            this.addChild(this.info = new Info(this))
          })
    
          this.on('mouseleave', () => {
            this.rectArea.destroy()
            this.infoBox.destroy()
            this.info.destroy()
          })
  
          this.on('mousedown', () => {
            this.on('mousemove', this._updatePosition)
          })
  
          this.on('mouseup', () => {
            this.off('mousemove', this._updatePosition)
          })
  
          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (e) => {
            if (e.keyCode === 91) {
              this.dragable = true
            }
          })
  
          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (e) => {
            if (e.keyCode === 91) {
              this.dragable = false
            }
          })
        }
      }
  
      _updatePosition (e) {
        if (this.dragable) {
          this.x += e.getDelta().x
          this.y += e.getDelta().y
          this.info.updateInfo({
            x: this.x,
            y: this.y
          })
        }
      }
    }
  }  
}