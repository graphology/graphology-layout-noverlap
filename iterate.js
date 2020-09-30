/**
 * Graphology Noverlap Iteration
 * ==============================
 *
 * Function used to perform a single iteration of the algorithm.
 */

/**
 * Matrices properties accessors.
 */
var NODE_X = 0,
    NODE_Y = 1,
    NODE_SIZE = 2;

/**
 * Constants.
 */
var PPN = 3;

/**
 * Helpers.
 */
function hashPair(a, b) {
  return a + '§' + b;
}

/**
 * Function used to perform a single interation of the algorithm.
 *
 * @param  {object}       options    - Layout options.
 * @param  {Float32Array} NodeMatrix - Node data.
 * @return {object}                  - Some metadata.
 */
module.exports = function iterate(options, NodeMatrix) {

  // Caching options
  var margin = options.margin;
  var ratio = options.ratio;
  var permittedExpansion = options.permittedExpansion;
  var gridSize = options.gridSize;

  // Generic iteration variables
  var i, x, y, size;
  var converged = true;

  var l = NodeMatrix.length;
  var order = (l / PPN) | 0;

  var deltaX = new Float32Array(order);
  var deltaY = new Float32Array(order);

  // Finding the extents of our space
  var xMin = yMin = Infinity;
  var xMax = yMax = -Infinity;

  for (i = 0; i < l; i += PPN) {
    x = NodeMatrix[i + NODE_X];
    y = NodeMatrix[i + NODE_Y];
    size = NodeMatrix[i + NODE_SIZE] * ratio + margin;

    xMin = Math.min(xMin, x - size);
    xMax = Math.max(xMax, x + size);
    yMin = Math.min(yMin, y - size);
    yMax = Math.min(yMax, y + size);
  }

  var width = xMax - xMin;
  var height = yMax - yMin;
  var xCenter = (xMin + xMax) / 2;
  var yCenter = (yMin + yMax) / 2;

  xMin = xCenter - permittedExpansion * width / 2;
  xMax = xCenter + permittedExpansion * width / 2;
  yMin = yCenter - permittedExpansion * height / 2;
  yMax = yCenter + permittedExpansion * height / 2;

  // Building grid
  var grid = new Array(gridSize * gridSize);

  for (i = 0; i < grid.length; i++)
    grid[i] = [];

  var nxMin, nxMax, nyMin, nyMax;
  var xMinBox, xMaxBox, yMinBox, yMaxBox;

  var col, row;

  for (i = 0; i < l; i += PPN) {
    x = NodeMatrix[i + NODE_X];
    y = NodeMatrix[i + NODE_Y];
    size = NodeMatrix[i + NODE_SIZE] * ratio + margin;

    nxMin = x - size;
    nxMax = x + size;
    nyMin = y - size;
    nyMax = y + size;

    xMinBox = Math.floor(gridSize * (nxMin - xmin) / (xmax - xmin));
    xMaxBox = Math.floor(gridSize * (nxMax - xmin) / (xmax - xmin));
    yMinBox = Math.floor(gridSize * (nyMin - ymin) / (ymax - ymin));
    yMaxBox = Math.floor(gridSize * (nyMax - ymin) / (ymax - ymin));

    for(col = xMinBox; col <= xMaxBox; col++) {
      for(row = yMinBox; row <= yMaxBox; row++) {
        grid[col * gridSize + row].push(i);
      }
    }
  }

  console.log(grid);

  return {converged: converged};
};
