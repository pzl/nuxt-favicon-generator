nuxt-favicon-generator
======================

This was borne out of two needs:

- Have all the various favicon PNG sizes of favicons that you 'should' have (e.g. 16, 32, 48, 64, 96, 128..)
- Not having to re-make all those images manually when making a change

So that's what this nuxt module does. You give it one source image, and it will generate all the sizes, formats, and names you tell it to. It does this as a nuxt build step.


Installation
------------

```sh
npm install --save nuxt-favicon-generator
```
or use yarn.
(when I get around to sending this to npm)

add `nuxt-favicon-generator` to `modules` section of `nuxt.config.js` (before `@nuxtjs/manifest` if you use it)

```js
module.exports = {
  modules: [
    //simple usage
    'nuxt-favicon-generator',

    //or with options
    ['nuxt-favicon-generator', { input: '~/assets/file.png' }],
  ],

  //or use global options
  favicon: {
    input: '~/assets/file.png',
  }
}
```

create your master favicon and put it in the configuration


**NOTE**: Ico generation is temporarily disabled until a bit-depth issue is sorted out


Options
-------

### `color`

Background color to use. You may use a master image with transparency and flood the background with a configured color.

### `input`

Path to your master image. May be jpg, png, webp, tiff, gif, or svg. The nuxt path shortcuts `~`, `@`, etc are respected.

### `generate`

An array of output images to create. Each array entry should be an object that at least contains `path`. The full list of generate-options is below

### generate: `path`

Output file name. Resulting path will be relative to your `{srcDir}/static` folder. Supported output formats are: jpg, png, webp, tiff, ico

### generate: `size`

Array of `[width, height]` to output this image to. E.g. `size: [32,32]`.

### generate: `sizes`

For **Ico** only. Array of image layer sizes (square) to generate. E.g. `sizes: [16, 24, 32, 64]`. This is not to be used alongside `size` property.

### generate: `operations`

Array of image operations to be performed on output image. Happens before resize (if any).

Array items can be a string (e.g. `operations: ['flip','trim']`) or an object containing `name` and `args` keys to provide arguments to an operation.

Example:

```
generate: {
  path: 'flipped-blurry.png',
  size: [32,32],
  operations: [
    'flip',
    {name: 'blur', args: [3]}
  ]
```

valid operations are anything in the [sharp API](http://sharp.pixelplumbing.com/en/stable/). This includes [resize operations](http://sharp.pixelplumbing.com/en/stable/api-resize/), [overlaying](http://sharp.pixelplumbing.com/en/stable/api-composite/), [and many more](http://sharp.pixelplumbing.com/en/stable/api-operation/).

Non comprehensive list:

[resize](http://sharp.pixelplumbing.com/en/stable/api-resize/#resize), [crop](http://sharp.pixelplumbing.com/en/stable/api-resize/#crop), [rotate](http://sharp.pixelplumbing.com/en/stable/api-operation/#rotate), [flip](http://sharp.pixelplumbing.com/en/stable/api-operation/#flip), [sharpen](http://sharp.pixelplumbing.com/en/stable/api-operation/#sharpen), [blur](http://sharp.pixelplumbing.com/en/stable/api-operation/#blur) [extend](http://sharp.pixelplumbing.com/en/stable/api-operation/#extend), [trim](http://sharp.pixelplumbing.com/en/stable/api-operation/#trim), [negate (invert)](http://sharp.pixelplumbing.com/en/stable/api-operation/#negate), [greyscale](http://sharp.pixelplumbing.com/en/stable/api-colour/#greyscale)


Example Config
--------------

```js
module.exports = {
  modules: [
    'nuxt-favicon-generator'
  ],
  favicon: {
    color: '#85b1f7',
    input: '~/assets/img/favicon-master.svg',
    generate: [
      {path: 'tile.png', size: [70, 70]},
      {path: 'tile150.png', size: [150, 150]},
      {path: 'tile-wide.png', size: [310, 150]},
      {path: 'tile310.png', size: [310, 310]},
      {path: 'favicon.ico', sizes: [16,24,32,48,64,128]},
      {path: 'favicon-16.png', size: [16, 16]},
      {path: 'favicon-32.png', size: [32, 32]},
      {path: 'favicon-48.png', size: [48, 48]},
      {path: 'favicon-64.png', size: [64, 64]},
      {path: 'favicon-96.png', size: [96, 96]},
      {path: 'favicon-128.png', size: [128, 128]},
      {path: 'favicon-196.png', size: [196,196]},
      {path: 'touch-icon-72.png', size: [72, 72]},
      {path: 'touch-icon-114.png', size: [114, 114]},
      {path: 'touch-icon-144.png', size: [144, 144]},
      {path: 'touch-icon-180.png', size: [180, 180]}
    ]
  },
  head {
    link: [
      { rel: 'icon', type: 'image/png', href: 'favicon-16.png', sizes: "16x16" },
      { rel: 'icon', type: 'image/png', href: 'favicon-32.png', sizes: "32x32" },
      { rel: 'icon', type: 'image/png', href: 'favicon-48.png', sizes: "48x48" },
      { rel: 'icon', type: 'image/png', href: 'favicon-64.png', sizes: "64x64" },
      { rel: 'icon', type: 'image/png', href: 'favicon-96.png', sizes: "96x96" },
      { rel: 'icon', type: 'image/png', href: 'favicon-128.png', sizes: "128x128" },
      { rel: 'icon', type: 'image/png', href: 'favicon-196.png', sizes: "196x196" },
      { rel: 'apple-touch-icon', href: 'touch-icon-72.png' },
      { rel: 'apple-touch-icon', href: 'touch-icon-114.png', sizes: "114x114" },
      { rel: 'apple-touch-icon', href: 'touch-icon-144.png', sizes: "144x144" },
      { rel: 'apple-touch-icon', href: 'touch-icon-180.png', sizes: "180x180" },
    ]
  }
}
```


License
-------

This project and code is licensed under the MIT license. See `LICENSE` file for more.
