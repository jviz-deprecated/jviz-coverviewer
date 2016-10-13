# CoverViewer

An interactive module for visualizing sequence coverage in delimited regions.

## Installation

Use the **jviz CLI** for installing this module:

```
jviz install coverviewer
```

## Reference

### Options

### API

#### coverviewer.draw(start)

Draw the coverage values starting at the position given by the argument `start`.

#### coverviewer.move(status)

Enable or disable the move action. If no argument is provided, this method will return the actual status.

#### coverviewer.clear()

Clear all layers.

### Events

#### coverviewer.on('mouse:down', handler)

Emit the `handler` function when the user press the left mouse button. The `handler` function will be called with the following arguments:
- `start`: coverage draw start position.
- `end`: coverage draw end position.

#### coverviewer.on('mouse:move', handler)

Emit the `handler` function when the user moves the coverage graphic. The `handler` function will be called with the following arguments:
- `start`: actual coverage draw start position.
- `end`: actual coverage draw end position.

#### coverviewer.on('mouse:up', handler)

Emit the `handler` function when the user release the left mouse button. The `handler` function will be called with the following arguments:
- `start`: actual coverage draw start position.
- `end`: actual coverage draw end position. 

## License

[MIT LICENSE](./LICENSE) &copy; The Jviz Team.
