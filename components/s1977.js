import React, { Component } from 'react';
import GL from "gl-react"

const shaders = GL.Shaders.create({
  s1977: {
    frag: `
      precision lowp float;
      varying highp vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2; // blowout

      void main()
      {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(
          texture2D(inputImageTexture2, vec2(texel.r, .16666)).r,
          texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
          texture2D(inputImageTexture2, vec2(texel.b, .83333)).b
        );

        gl_FragColor = vec4(texel, 1.0);
      }
    `
  }
});

export default GL.createComponent(
  ({ inputImageTexture, inputImageTexture2, ...rest }) =>
    <GL.Node
      {...rest}
      shader={shaders.s1977}
      uniforms={{ inputImageTexture, inputImageTexture2 }}
    />,
  { displayName: "s1977" }
);
