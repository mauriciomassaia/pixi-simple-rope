function setup() {
  const resources = PIXI.Loader.shared.resources

  const app = new PIXI.Application({
    backgroundColor: 0xffffff,
    width: 1000,
    height: 1000
  })
  document.body.appendChild(app.view)

  // Shared points for all SimpleRope instances
  const points = []
  for (let i = 0; i < 20; i++) {
    points.push(new PIXI.Point(i * 10, 0))
  }

  // Circles
  let circleTextureIndex = 0
  const circleTextures = resources["circle.json"].spritesheet.animations.circle

  const title1 = new PIXI.Text('Spritesheet textures', { fontSize: 20, fill: '#333' })
  title1.x = 10
  title1.y = 150
  app.stage.addChild(title1)

  const circleRope = new PIXI.SimpleRope(circleTextures[circleTextureIndex], points)
  circleRope.x = 50
  circleRope.y = 300
  app.stage.addChild(circleRope)

  const circleRopeText = new PIXI.Text('SimpleRope')
  circleRopeText.x = circleRope.x
  circleRopeText.y = 5
  app.stage.addChild(circleRopeText)

  const circleRope2 = new PIXI.SimpleRope(circleTextures[circleTextureIndex], points)
  circleRope2.x = 300;
  circleRope2.y = 300;
  app.stage.addChild(circleRope2)

  const circleRope2Text = new PIXI.Text('SimpleRope\ncall .calculateUvs()')
  circleRope2Text.x = circleRope2.x
  circleRope2Text.y = 5
  app.stage.addChild(circleRope2Text)

  const circleSprite = new PIXI.Sprite(circleTextures[circleTextureIndex])
  circleSprite.anchor.set(0.5, 0.5)
  circleSprite.x = 650
  circleSprite.y = 300
  app.stage.addChild(circleSprite)

  const spriteText = new PIXI.Text('Sprite')
  spriteText.x = circleSprite.x - circleSprite.width * 0.5
  spriteText.y = 5
  app.stage.addChild(spriteText)

  // Stars
  let starTextureIndex = 0

  const starTexture = [
    resources['star_00.png'].texture,
    resources['star_01.png'].texture,
    resources['star_02.png'].texture,
    resources['star_03.png'].texture,
    resources['star_04.png'].texture
  ]

  const title2 = new PIXI.Text('Image sequence textures', { fontSize: 20, fill: '#333'})
  title2.x = 10
  title2.y = 450
  app.stage.addChild(title2)

  const starSprite = new PIXI.Sprite(starTexture[starTextureIndex])
  starSprite.anchor.set(0.5, 0.5)
  starSprite.x = 650
  starSprite.y = 600
  app.stage.addChild(starSprite)

  const starRope = new PIXI.SimpleRope(starTexture[circleTextureIndex], points)
  starRope.x = 50;
  starRope.y = 600;
  app.stage.addChild(starRope)

  let c = 0

  app.ticker.add(() => {
    c += 1
    points.forEach((p, i) => {
      p.y = Math.cos(c * 0.1 + i * 0.25) * 20
    })

    if (c % 30 === 0) {
      // change every 30 frames

      // Update circles
      circleTextureIndex++
      circleTextureIndex %= circleTextures.length

      // update rope texture
      circleRope.texture = circleTextures[circleTextureIndex]

      // force texture update with calculateUvs()
      circleRope2.texture = circleTextures[circleTextureIndex]
      circleRope2.calculateUvs()

      // update sprite
      circleSprite.texture = circleTextures[circleTextureIndex]

      // Update Stars
      starTextureIndex++
      starTextureIndex %= starTexture.length
      starSprite.texture = starTexture[starTextureIndex]

      // dont need to call calculateUvs() on SimpleRope when using
      // sequence of textures that doesnt share the same baseTexture
      starRope.texture = starTexture[starTextureIndex]
    }
  })
}

PIXI.Loader.shared
  .add('star_00.png')
  .add('star_01.png')
  .add('star_02.png')
  .add('star_03.png')
  .add('star_04.png')
  .add("circle.json")
  .load(setup)
