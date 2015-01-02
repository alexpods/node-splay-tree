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

SplayTree.prototype.get = function(key) {
    var result = search(this._root, key);

    if (!result[1]) {
        throw new Error('Could not get element. Element with key "' + key + '" does not exists!');
    }

    var node = result[0];

    node[3] =
    this._root = splay(node);

    return result[0][1];
};

SplayTree.prototype.has = function(key) {
    var result = search(this._root, key);
    this._root = splay(result[0]);

    return result[1];
};

SplayTree.prototype.set = function(key, value) {
    if (!this._root) {
        this._root = [key, value, null, null, null];
        return this;
    }

    var result = search(this._root, key);
    var node   = result[0];

    if (result[1]) {
        node[1] = value;
    }
    else {
        var parent = node;

        node = [key, value, parent, null, null];

        if (key < parent[0]) {
            parent[3] = node;
        }
        else {
            parent[4] = node;
        }
    }

    this._root = splay(node);

    return this;
};

SplayTree.prototype.remove = function(key) {
    var result = search(this._root, key);

    if (!result[1]) {
        throw new Error('Could not remove element. Element with key "' + key + '" does not exists!');
    }

    var node = result[0];

    splay(node);

    var left   = node[3];
    var right  = node[4];

    if (!left) {
        right[2] = null;
        this._root = right;
    }
    else if (!right) {
        left[2] = null;
        this._root = left;
    }
    else {
        var leftMax = getTreeMax(left);

        if (leftMax === node[3]) {
            leftMax[4] = node[4];
            leftMax[2] = null;
        }
        else {
            replace(node, leftMax);
            node[3][2] = node[2];
            node[2][4] = node[3];
        }

        this._root = leftMax;
    }

    return this;
};

function search(node, key) {
    var nKey;

    while ((nKey = node[0]) !== key) {
        if (key < nKey && node[3]) {
            node = node[3];
        }
        else if (key > nKey && node[4]) {
            node = node[4];
        }
        else {
            return [node, false];
        }
    }

    return [node, true];
}

function splay(node) {
    var parent, grand;

    while (parent = node[2]) {
        grand  = parent[2];

        if (!grand) {
            parent[3] === node
                ? rotateRight(parent) // Zig right
                : rotateLeft(parent); // Zig left
        }
        else if (grand[3] === parent && parent[3] === node) {
            // Right zig-zig
            rotateRight(grand);
            rotateRight(parent);
        }
        else if (grand[4] === parent && parent[4] === node) {
            // Left zig-zig
            rotateLeft(grand);
            rotateLeft(parent);
        }
        else if (grand[3] === parent && parent[4] === node) {
            // Left zig-zag
            rotateLeft(parent);
            rotateRight(grand)
        }
        else if (grand[4] === parent && parent[3] === node) {
            // Right zig-zag
            rotateRight(parent);
            rotateLeft(grand);
        }
        else {
            throw new Error('Incorrect tree structure around node with key "' + node[0]);
        }
    }

    return node;
}

function rotateRight(node) {
    var left   = node[3];

    if (!left) {
        return;
    }

    var parent = node[2];

    left[2] = parent;

    if (parent) {
        parent[3] === node
            ? parent[3] = left
            : parent[4] = left;
    }

    node[2] = left;
    node[3] = left[4];

    if (left[4]) {
        left[4][2] = node;
    }

    left[4] = node;
}

function rotateLeft(node) {
    var right = node[4];

    if (!right) {
        return;
    }

    var parent = node[2];

    right[2] = parent;

    if (parent) {
        parent[3] === node
            ? parent[3] = right
            : parent[4] = right;
    }

    node[2] = right;
    node[4] = right[3];

    if (right[3]) {
        right[3][2] = node;
    }

    right[3] = node;
}

function replace(oldNode, newNode) {
    var oldParent = oldNode[2];
    var oldLeft   = oldNode[3];
    var oldRight  = oldNode[4];

    var newParent = newNode[2];
    var newLeft   = newNode[3];
    var newRight  = newNode[4];

    newNode[2] = oldParent;

    if (oldParent) {
        oldParent[3] === oldNode
            ? oldParent[3] = newNode
            : oldParent[4] = newNode;
    }

    newNode[3] = oldLeft;
    if (oldLeft) {
        oldLeft[2] = newNode;
    }

    newNode[4] = oldRight;
    if (oldRight) {
        oldRight[2] = newNode;
    }

    oldNode[2] = newParent;

    if (newParent) {
        newParent[3] === newNode
            ? newParent[3] = oldNode
            : newParent[4] = oldNode;
    }

    oldNode[3] = newLeft;
    if (newLeft) {
        newLeft[2] = oldNode;
    }

    oldNode[4] = newRight;
    if (newRight) {
        newRight[2] = oldNode;
    }
}

function getTreeMin(node) {
    while (node[3]) {
        node = node[3];
    }
    return node;
}

function getTreeMax(node) {
    while (node[4]) {
        node = node[4];
    }
    return node;
}