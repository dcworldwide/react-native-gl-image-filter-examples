import React, { Component } from 'react';
import GL from "gl-react"

const shaders = GL.Shaders.create({
  inkwell: {
    frag: `
      precision lowp float;
      varying highp vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2; //map

      void main()
      {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(dot(vec3(0.3, 0.6, 0.1), texel));
        texel = vec3(texture2D(inputImageTexture2, vec2(texel.r, .16666)).r);
        gl_FragColor = vec4(texel, 1.0);
      }
    `
  }
});




export default GL.createComponent(
  ({ inputImageTexture, inputImageTexture2, ...rest }) =>
    <GL.Node
      {...rest}
      shader={shaders.inkwell}
      uniforms={{ inputImageTexture, inputImageTexture2 }}
    />,
  { displayName: "inkwell" }
);
