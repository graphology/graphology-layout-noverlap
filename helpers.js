/**
 * Graphology Noverlap Helpers
 * ============================
 *
 * Miscellaneous helper functions.
 */

/**
 * Constants.
 */
var PPN = 3;

/**
 * Function used to validate the given settings.
 *
 * @param  {object}      settings - Settings to validate.
 * @return {object|null}
 */
exports.validateSettings = function(settings) {

  if ('gridSize' in settings &&
      typeof settings.gridSize !== 'number' || settings.gridSize <= 0)
    return {message: 'the `gridSize` setting should be a positive number.'};

  if ('margin' in settings &&
      typeof settings.margin !== 'number' || settings.margin < 0)
    return {message: 'the `margin` setting should be 0 or a positive number.'};

  if ('permittedExpansion' in settings &&
      typeof settings.permittedExpansion !== 'number' || settings.permittedExpansion <= 0)
    return {message: 'the `permittedExpansion` setting should be a positive number.'};

  if ('ratio' in settings &&
      typeof settings.ratio !== 'number' || settings.ratio <= 0)
    return {message: 'the `ratio` setting should be a positive number.'};

  if ('speed' in settings &&
      typeof settings.speed !== 'number' || settings.speed <= 0)
    return {message: 'the `speed` setting should be a positive number.'};

  return null;
};

/**
 * Function generating a flat matrix for the given graph's nodes.
 *
 * @param  {Graph}        graph   - Target graph.
 * @param  {function}     reducer - Node reducer function.
 * @return {Float32Array}         - The node matrix.
 */
exports.graphToByteArray = function(graph, reducer) {
  var order = graph.order;

  var matrix = new Float32Array(order * PPN);

  var j = 0;

  graph.forEachNode(function(node, attr) {
    if (typeof reducer === 'function')
      attr = reducer(node, attr);

    matrix[j] = attr.x;
    matrix[j + 1] = attr.y;
    matrix[j + 2] = attr.size || 1;
    j += PPN;
  });

  return matrix;
};


/**
 * Function applying the layout back to the graph.
 *
 * @param {Graph}        graph      - Target graph.
 * @param {Float32Array} NodeMatrix - Node matrix.
 */
exports.assignLayoutChanges = function(graph, NodeMatrix) {
  var nodes = graph.nodes();

  for (var i = 0, j = 0, l = NodeMatrix.length; i < l; i += PPN) {
    graph.setNodeAttribute(nodes[j], 'x', NodeMatrix[i]);
    graph.setNodeAttribute(nodes[j], 'y', NodeMatrix[i + 1]);
    j++;
  }
};

/**
 * Function collecting the layout positions.
 *
 * @param  {Graph}        graph      - Target graph.
 * @param  {Float32Array} NodeMatrix - Node matrix.
 * @return {object}                  - Map to node positions.
 */
exports.collectLayoutChanges = function(graph, NodeMatrix) {
  var nodes = graph.nodes(),
      positions = {};

  for (var i = 0, j = 0, l = NodeMatrix.length; i < l; i += PPN) {
    positions[nodes[j]] = {
      x: NodeMatrix[i],
      y: NodeMatrix[i + 1]
    };

    j++;
  }

  return positions;
};

/**
 * Function returning a web worker from the given function.
 *
 * @param  {function}  fn - Function for the worker.
 * @return {DOMString}
 */
exports.createWorker = function createWorker(fn) {
  var xURL = window.URL || window.webkitURL;
  var code = fn.toString();
  var objectUrl = xURL.createObjectURL(new Blob(['(' + code + ').call(this);'], {type: 'text/javascript'}));
  var worker = new Worker(objectUrl);
  xURL.revokeObjectURL(objectUrl);

  return worker;
};
