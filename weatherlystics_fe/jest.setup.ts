import "@testing-library/jest-dom";
import 'jest-canvas-mock';


const { createCanvas } = require('canvas');

HTMLCanvasElement.prototype.getContext = function (contextType) {
  return createCanvas(0, 0).getContext(contextType);
};

