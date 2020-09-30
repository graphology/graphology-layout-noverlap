[![Build Status](https://travis-ci.org/graphology/graphology-layout-noverlap.svg)](https://travis-ci.org/graphology/graphology-layout-noverlap)

# Graphology Noverlap

JavaScript implementation of the Noverlap anti-collision layout algorithm for [graphology](https://graphology.github.io).

Note that this algorithm is iterative and might not converge easily in some cases.

## Installation

```
npm install graphology-layout-noverlap
```

## Usage

* [Pre-requisite](#pre-requisite)
* [Settings](#settings)
* [Synchronous layout](#synchronous-layout)

### Pre-requisites

Each node's starting position must be set before running the Noverlap anti-collision layout. Two attributes called `x` and `y` must therefore be defined for all the graph nodes.

### Settings

* **gridSize** *?number* [`20`]: number of grid cells horizontally and vertically subdivising the graph's space. This is used as an optimization scheme. Set it to `1` and you will have `O(n²)` time complexity, which can sometimes perform better with very few nodes.
* **margin** *?number* [`5`]: margin to keep between nodes.
* **permittedExpansion** *?number* [`1.1`]: percentage of current space that nodes could attempt to move outside of.
* **ratio** *?number* [`1.0`]: ratio scaling node sizes.
* **speed** *?number* [`3`]: dampening factor that will slow down node movements to ease the overall process.

### Synchronous layout

```js
import noverlap from 'graphology-layout-noverlap';

const positions = noverlap(graph, {maxIterations: 50});

// With settings:
const positions = noverlap(graph, {
  maxIterations: 50,
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
  - **maxIterations** *number*: maximum number of iterations to perform before stopping.
  - **settings** *?object*: the layout's settings (see [#settings](#settings)).
