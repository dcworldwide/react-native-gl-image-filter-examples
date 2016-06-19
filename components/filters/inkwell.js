import React, { Component } from 'react';
import GL from "gl-react"

// A b&w shader with a gradient overlay.
// Inspiration: https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_FiltersViewController/DSFilterTileInkwell%402x.png

const shaders = GL.Shaders.create({
  inkwell: {
    frag: `
      precision highp float;
      varying highp vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      void main () {
        vec4 c = texture2D(inputImageTexture, uv);
        vec4 d = texture2D(inputImageTexture2, uv);

        // 1 - Produces a grey scale, saturated image with no gradient
        const vec3 W = vec3(0.2125, 0.7154, 0.0721);
        gl_FragColor = vec4(mix(vec3(dot(c.rgb, W)), c.rgb, 0.1), c.a);

        // 1.1 Extends 1 with a gradient
        // const vec3 W = vec3(0.2125, 0.7154, 0.0721); // make greyscale
        // color
        // gl_FragColor = vec4(mix(vec3(dot(c.rgb, W)), vec3(dot(d.rgb, W)), 0.2), c.a);
        // grey with rainbow gradient
        // gl_FragColor = vec4(mix(vec3(dot(c.rgb, W)), d.rgb, 0.15), c.a);
        // gl_FragColor = vec4(mix(vec3(dot(c.rgb, W)), c.rgb, 0.3), c.a);

        // 2
        //gl_FragColor = vec4(mix(vec3(dot(c.rgb, d.rgb)), c.rgb, 0.5), c.a);

        // 3
        // vec3 texel = texture2D(inputImageTexture, uv).rgb;
        // texel = vec3(dot(vec3(0.3, 0.6, 0.1), texel));
        //texel = vec3(texture2D(inputImageTexture2, vec2(texel.r, .16666)).r);
        //texel = vec3(d.r, vec2(texel.r, .16666)).rgb;
        // d = vec3(dot(vec3(0.3, 0.1, 0.1), d.rgb));
        //texel = vec3(dot(c.rgb, d.rgb));
        // gl_FragColor = vec4(texel, 1.0);
      }
    `
  }
});

//Original
// vec3 texel = texture2D(inputImageTexture, textureCoordinate).rgb;
// texel = vec3(dot(vec3(0.3, 0.6, 0.1), texel));
// texel = vec3(texture2D(inputImageTexture2, vec2(texel.r, .16666)).r);
// gl_FragColor = vec4(texel, 1.0);


// precision lowp float;
// varying highp vec2 uv;
// uniform sampler2D inputImageTexture;
// uniform sampler2D inputImageTexture2; //map

// vec3 texel = texture2D(inputImageTexture, uv).r;
// texel = vec3(dot(vec3(0.3, 0.6, 0.1), texel));
// texel = vec3(texture2D(inputImageTexture2, vec2(texel.r, .16666)).r);
// gl_FragColor = vec4(texel, 1.0);

// export default GL.createComponent(
//   ({ inputImageTexture, inputImageTexture2, ...rest }) =>
//     <GL.Node
//       {...rest}
//       shader={shaders.inkwell}
//       uniforms={{ inputImageTexture, inputImageTexture2 }}
//     />,
//   { displayName: "inkwell" }
// );


export default GL.createComponent(
  ({ inputImageTexture, inputImageTexture2, ...rest }) =>
    <GL.Node
      shader={shaders.inkwell}
      uniforms={{ inputImageTexture, inputImageTexture2 }}
      {...rest}
    />,
  { displayName: "inkwell" }
);
