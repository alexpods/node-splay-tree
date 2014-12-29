module.exports = SplayTree;

function SplayTree() {
    this._root = null;
}

Object.defineProperty(SplayTree.prototype, 'root', {
    configurable: false,
    enumerable:   false,
    get: function() {
        return this._root && this._root[1];
    }
});

SplayTree.prototype.set = function(key, value) {
    if (!this._root) {
        this._root = [key, value];
    }

    // splaying and setting

    return this;
};