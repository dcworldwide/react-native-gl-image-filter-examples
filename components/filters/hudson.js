import React, { Component } from 'react';
import GL from "gl-react"

// Washed out colour with gradient
// Inspiration: https://github.com/danielgindi/Instagram-Filters/blob/master/InstaFilters/Resources_for_FiltersViewController/DSFilterTileHudson%402x.png

const shaders = GL.Shaders.create({
  hudson: {
    frag: `
      precision lowp float;
      varying highp vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2; //blowout background ;
      uniform sampler2D inputImageTexture3; //overlay soft light;
      uniform sampler2D inputImageTexture4; //map gradient

      void main()
      {
          vec4 texel = texture2D(inputImageTexture, uv);

          vec4 a = texture2D(inputImageTexture, uv);
          vec4 b = texture2D(inputImageTexture2, uv);
          vec4 c = texture2D(inputImageTexture3, uv);
          vec4 d = texture2D(inputImageTexture4, uv);

          // Attempt 1, using dot products to interpolate tex
          // vec3 ab = vec3(dot(b.rgb, c.rgb));
          // vec3 abc = vec3(dot(ab.rgb, d.rgb));
          // vec3 abcd = vec3(dot(abc.rgb, a.rgb));
          // gl_FragColor = vec4(abcd.rgb, 1.0);

          // Attempt 2, using mix
          vec3 bc = vec3(dot(b.rgb, c.rgb));
          vec3 bcd = vec3(dot(bc.rgb, d.rgb));

          gl_FragColor = vec4(mix(bcd.rgb, a.rgb, 0.7), c.a);

          // vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;
          //
          // texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, texel.r)).r;
          // texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, texel.g)).g;
          // texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, texel.b)).b;
          //
          // vec4 mapped;
          // mapped.r = texture2D(inputImageTexture4, vec2(texel.r, 0.16666)).r;
          // mapped.g = texture2D(inputImageTexture4, vec2(texel.g, 0.5)).g;
          // mapped.b = texture2D(inputImageTexture4, vec2(texel.b, 0.83333)).b;
          // mapped.a = 1.0;
          //
          // gl_FragColor = mapped;
          // gl_FragColor = vec4(texel.rgb, 1.0);
      }
    `
  }
});

/*
 Original - was coming out green

 vec4 texel = texture2D(inputImageTexture, uv);

 vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;

 texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, texel.r)).r;
 texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, texel.g)).g;
 texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, texel.b)).b;

 vec4 mapped;
 mapped.r = texture2D(inputImageTexture4, vec2(texel.r, .16666)).r;
 mapped.g = texture2D(inputImageTexture4, vec2(texel.g, .5)).g;
 mapped.b = texture2D(inputImageTexture4, vec2(texel.b, .83333)).b;
 mapped.a = 1.0;
 gl_FragColor = mapped;

*/

export default GL.createComponent(
  ({ inputImageTexture, inputImageTexture2, inputImageTexture3, inputImageTexture4, ...rest }) =>
    <GL.Node
      {...rest}
      shader={shaders.hudson}
      uniforms={{ inputImageTexture, inputImageTexture2, inputImageTexture3, inputImageTexture4 }}
    />,
  { displayName: "hudson" }
);
