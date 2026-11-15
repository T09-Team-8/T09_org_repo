import { ShaderFill, type Shader } from '@figma/expressive-components';
import { setup, render, manifest } from '../lib/custom-effects/CodeComponentId_8ce92017e53431a2f04b3574f4ba7c98f6f55f1e_8358';

const shader: Shader = {
  setup,
  render,
  manifest,
  params: {
    intensity: 4.29,
    detail: 1.78,
    twist: 0.04,
    warp: 0.26,
    zoom: 72,
    rotationSpeed: 3,
    morphSpeed: 3.74,
    material: 2,
    gradientBalance: 0,
    gradientMethod: 0,
    gradient: {
      stops: [
        { position: 0, color: { r: 0.9568627477, g: 0.9411764741, b: 0.5647059083, a: 1 } },
        { position: 0.5, color: { r: 0.8627451062, g: 0.9294117689, b: 0.9215686321, a: 1 } },
        { position: 0.75, color: { r: 0.9607843161, g: 0.9411764741, b: 0.8784313798, a: 1 } },
        { position: 1, color: { r: 0.168627451, g: 0.0588235294, b: 0.0745098039, a: 1 } },
      ],
    },
  },
};

export default function KindlifeHeaderShader() {
  return <ShaderFill shader={shader} className="kindlife_header_shader_canvas" />;
}