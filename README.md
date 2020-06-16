# Pixi SimpleRope

Test with Spritesheet and sequence of Images.

- Using [pixi.js](https://www.pixijs.com/) [v5.2.4](https://github.com/pixijs/pixi.js/releases/tag/v5.2.4)

Issue when updating SimpleRope texture with textures from Spritesheet.

You must call `mySimpleRope.calculateUvs()` after changing `mySimpleRope.texture` .

Like in the code on `docs/index.js` line 102

```javascript
// force texture update with calculateUvs()
circleRope2.texture = circleTextures[circleTextureIndex]
circleRope2.calculateUvs()
```

Spritesheet generated with [TexturePacker](https://www.codeandweb.com/texturepacker)
