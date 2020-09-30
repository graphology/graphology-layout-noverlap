/**
 * Graphology FA2 Layout Unit Tests
 * =================================
 */
var assert = require('assert'),
    Graph = require('graphology');

var helpers = require('./helpers.js'),
    layout = require('./index.js');

// var seedrandom = require('seedrandom');

// var rng = function() {
//   return seedrandom('test');
// };

// var clusters = require('graphology-generators/random/clusters');
// var empty = require('graphology-generators/classic/empty');

describe('graphology-layout-forceatlas2', function() {

  describe('helpers', function() {

    describe('#.graphToByteArray', function() {

      it('should work as expected.', function() {
        var graph = new Graph();

        var data = {
          John: {
            size: 4,
            x: 3,
            y: 4
          },
          Martha: {
            x: 10,
            y: 5
          },
          Ada: {
            x: 23,
            y: -2
          }
        };

        for (var node in data)
          graph.addNode(node, data[node]);

        graph.addEdge('John', 'Martha');
        graph.addEdge('Martha', 'Ada', {weight: 3});

        var matrix = helpers.graphToByteArray(graph);

        assert.deepEqual(
          Array.from(matrix),
          [
            3, 4, 4,
            10, 5, 1,
            23, -2, 1
          ]
        );
      });

      it('should work when given a reducer.', function() {
        var graph = new Graph();

        var data = {
          John: {
            size: 4,
            x: 3,
            y: 4
          },
          Martha: {
            x: 10,
            y: 5
          },
          Ada: {
            x: 23,
            y: -2
          }
        };

        for (var node in data)
          graph.addNode(node, data[node]);

        var matrix = helpers.graphToByteArray(graph, function(node, attr) {
          return {
            x: attr.x * 10,
            y: attr.y * 100,
            size: 2
          };
        });

        assert.deepEqual(
          Array.from(matrix),
          [
            30, 400, 2,
            100, 500, 2,
            230, -200, 2
          ]
        );
      });
    });

    describe('#.collectLayoutChanges', function() {

      it('should work as expected.', function() {
        var graph = new Graph();

        var data = {
          John: {
            size: 4,
            x: 3,
            y: 4
          },
          Martha: {
            x: 10,
            y: 5
          },
          Ada: {
            x: 23,
            y: -2
          }
        };

        for (var node in data)
          graph.addNode(node, data[node]);

        var positions = helpers.collectLayoutChanges(graph, [
          4, 5, 4,
          11, 6, 1,
          24, -1, 1
        ]);

        assert.deepEqual(positions, {
          John: {x: 4, y: 5},
          Martha: {x: 11, y: 6},
          Ada: {x: 24, y: -1}
        });
      });
    });

    describe('#.assignLayoutChanges', function() {

      it('should work as expected.', function() {
        var graph = new Graph();

        var data = {
          John: {
            x: 3,
            y: 4
          },
          Martha: {
            x: 10,
            y: 5
          },
          Ada: {
            x: 23,
            y: -2
          }
        };

        for (var node in data)
          graph.addNode(node, data[node]);

        helpers.assignLayoutChanges(graph, [
          4, 5, 4,
          11, 6, 1,
          24, -1, 1
        ]);

        var positions = {
          John: graph.getNodeAttributes('John'),
          Martha: graph.getNodeAttributes('Martha'),
          Ada: graph.getNodeAttributes('Ada')
        };

        assert.deepEqual(positions, {
          John: {x: 4, y: 5},
          Martha: {x: 11, y: 6},
          Ada: {x: 24, y: -1}
        });
      });
    });
  });

  describe('synchronous', function() {

    it('should throw if the graph is invalid.', function() {
      assert.throws(function() {
        layout(null);
      }, /graphology/);
    });

    it('should throw if max iterations are not valid.', function() {
      assert.throws(function() {
        layout(new Graph(), -34);
      }, /positive/);
    });

    it('should throw if settings are invalid.', function() {

      assert.throws(function() {
        layout(new Graph(), {settings: {speed: -10}});
      }, /speed/);
    });
  });
});
