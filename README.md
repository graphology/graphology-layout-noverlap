[![Build Status](https://travis-ci.org/graphology/graphology-layout-noverlap.svg)](https://travis-ci.org/graphology/graphology-layout-noverlap)

# Graphology Noverlap

JavaScript implementation of the Noverlap anti-collision layout algorithm for [graphology](https://graphology.github.io).

## Installation

```
npm install graphology-layout-noverlap
```

## Usage

* [Pre-requisite](#pre-requisite)
* [Settings](#settings)
* [Synchronous layout](#synchronous-layout)
* [Webworker](#webworker)

### Pre-requisites

Each node's starting position must be set before running ForceAtlas 2 layout. Two attributes called `x` and `y` must therefore be defined for all the graph nodes. [graphology-layout](https://github.com/graphology/graphology-layout) can be used to initialize these attributes to a [random](https://github.com/graphology/graphology-layout#random) or [circular](https://github.com/graphology/graphology-layout#circular) layout, if needed.

Note also that the algorithm has an edge-case where the layout cannot be computed if all of your nodes starts with `x=0` and `y=0`.

### Settings

* **adjustSizes** *?boolean* [`false`]: should the node's sizes be taken into account?
* **barnesHutOptimize** *?boolean* [`false`]: whether to use the Barnes-Hut approximation to compute repulsion in `O(n*log(n))` rather than default `O(n^2)`, `n` being the number of nodes.
* **barnesHutTheta** *?number* [`0.5`]: Barnes-Hut approximation theta parameter.
* **edgeWeightInfluence** *?number* [`0`]: influence of the edge's weights on the layout.
* **gravity** *?number* [`1`]: strength of the layout's gravity.
* **linLogMode** *?boolean* [`false`]: whether to use Noack's LinLog model.
* **outboundAttractionDistribution** *?boolean* [`false`]
* **scalingRatio** *?number* [`1`]
* **slowDown** *?number* [`1`]
* **strongGravityMode** *?boolean* [`false`]

### Synchronous layout

```js
import noverlap from 'graphology-layout-noverlap';

const positions = noverlap(graph, {iterations: 50});

// With settings:
const positions = noverlap(graph, {
  iterations: 50,
  settings: {
    gravity: 10
  }
});

// To directly assign the positions to the nodes:
noverlap.assign(graph);
```

*Arguments*

* **graph** *Graph*: target graph.
* **options** *object*: options:
  - **iterations** *number*: number of iterations to perform.
  - **settings** *?object*: the layout's settings (see [#settings](#settings)).

### Webworker

If you need to run the layout's computation in a web worker, the library comes with a utility to do so:

*Example*

```js
import FA2Layout from 'graphology-layout-noverlap/worker';

const layout = new FA2Layout(graph);

// To start the layout
layout.start({settings: {gravity: 1}});

// To stop the layout
layout.stop();

// To kill the layout and release attached memory
layout.kill();
```
