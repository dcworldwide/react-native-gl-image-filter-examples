const GL = require("gl-react");
const React = require("react");

const {
  PropTypes
} = React;

const resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");
const inputImageTexture2 = resolveAssetSource(require('../../assets/filters/blackboard1024.png'))
const inputImageTexture3 = resolveAssetSource(require('../../assets/filters/overlayMap.png'))
const inputImageTexture4 = resolveAssetSource(require('../../assets/filters/amaroMap.png'))


const shaders = GL.Shaders.create({
  Amaro: {
    frag: `
      precision highp float;
      varying highp vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;

      void main () {
     
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

      }`
  }
});

module.exports = GL.createComponent(
  ({ inputImageTexture }) => {
    return <GL.Node
      shader={shaders.Amaro}
      uniforms={{ 
        inputImageTexture,
        inputImageTexture2: inputImageTexture2,
        inputImageTexture3: inputImageTexture3,
        inputImageTexture4: inputImageTexture4
      }}
    />
  },
  {
    displayName: "Amaro",
    // propTypes: {
    //   children: PropTypes.any.isRequired,
    // }
  }
);