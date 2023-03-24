const PackageShape = Object.freeze({
    O: {shape: [[1, 1], [1, 1]], info: {name: 'o', color: 'pink'}},
    I: {shape: [[1], [1], [1], [1]], info: {name: 'i', color: 'yellow'}},
    L: {shape: [[1, 0], [1, 0], [1, 1]], info: {name: 'l', color: 'orange'}},
    J: {shape: [[0, 1], [0, 1], [1, 1]], info: {name: 'j', color: 'red'}},
    S: {shape: [[0, 1], [1, 1], [1, 0]], info: {name: 's', color: 'blue'}},
    Z: {shape: [[1, 0], [1, 1], [0, 1]], info: {name: 'z', color: 'purple'}},
    T: {shape: [[1, 1, 1], [0, 1, 0]], info: {name: 't', color: 'green'}}
});

export default PackageShape;