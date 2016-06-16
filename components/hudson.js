import React, { Component } from 'react';
import GL from "gl-react"

const shaders = GL.Shaders.create({
  hudson: {
    frag: `
      precision lowp float;
      varying highp vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2; //blowout;
      uniform sampler2D inputImageTexture3; //overlay;
      uniform sampler2D inputImageTexture4; //map

      void main()
      {

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
      }
    `
  }
});

export default GL.createComponent(
  ({ inputImageTexture, inputImageTexture2, inputImageTexture3, inputImageTexture4, ...rest }) =>
    <GL.Node
      {...rest}
      shader={shaders.hudson}
      uniforms={{ inputImageTexture, inputImageTexture2, inputImageTexture3, inputImageTexture4 }}
    />,
  { displayName: "hudson" }
);
