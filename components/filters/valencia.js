import React, { Component } from 'react';
import GL from "gl-react"

// Cold colour, with center light and curved gradient border
// Inspiration: https://github.com/danielgindi/Instagram-Filters/blob/master/InstaFilters/Resources_for_FiltersViewController/DSFilterTileValencia%402x.png

const resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");
const inputImageTexture2 = resolveAssetSource(require('../../assets/filters/valenciaMap.png'))
const inputImageTexture3 = resolveAssetSource(require('../../assets/filters/valenciaGradientMap.png'))

const shaders = GL.Shaders.create({
  valencia: {
    frag: `
      precision lowp float;
      varying highp vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2; //map
      uniform sampler2D inputImageTexture3; //gradMap

      mat3 saturateMatrix = mat3(
                                 1.1402,
                                 -0.0598,
                                 -0.061,
                                 -0.1174,
                                 1.0826,
                                 -0.1186,
                                 -0.0228,
                                 -0.0228,
                                 1.1772);

      vec3 lumaCoeffs = vec3(.3, .59, .11);

      void main()
      {
          vec3 a = texture2D(inputImageTexture, uv).rgb;
          vec3 b = texture2D(inputImageTexture2, uv).rgb;
          vec3 c = texture2D(inputImageTexture3, uv).rgb;

          vec3 texel = texture2D(inputImageTexture, uv).rgb;

          texel = vec3(
            texture2D(inputImageTexture2, vec2(texel.r, .666666)).r,
            texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
            texture2D(inputImageTexture2, vec2(texel.b, .8333333)).b
          );

          texel = saturateMatrix * texel;
          float luma = dot(lumaCoeffs, texel);
          texel = vec3(
                       texture2D(inputImageTexture3, vec2(luma, texel.r)).r,
                       texture2D(inputImageTexture3, vec2(luma, texel.g)).g,
                       texture2D(inputImageTexture3, vec2(luma, texel.b)).b);

          gl_FragColor = vec4(texel.rgb, 1.0);
      }
    `
  }
});

/* Original
vec3 texel = texture2D(inputImageTexture, uv).rgb;

texel = vec3(
             texture2D(inputImageTexture2, vec2(texel.r, .1666666)).r,
             texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
             texture2D(inputImageTexture2, vec2(texel.b, .8333333)).b
             );

texel = saturateMatrix * texel;
float luma = dot(lumaCoeffs, texel);
texel = vec3(
             texture2D(inputImageTexture3, vec2(luma, texel.r)).r,
             texture2D(inputImageTexture3, vec2(luma, texel.g)).g,
             texture2D(inputImageTexture3, vec2(luma, texel.b)).b);

gl_FragColor = vec4(texel, 1.0);
*/

export default GL.createComponent(
  ({ inputImageTexture, ...rest }) =>
    <GL.Node
      {...rest}
      shader={shaders.valencia}
      uniforms={{
          inputImageTexture,
          inputImageTexture2,
          inputImageTexture3
      }}
    />,
  { displayName: "valencia" }
);
