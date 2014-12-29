var SplayTree = require('./index');
var expect = require('chai').expect;

describe('Splay tree', function() {
    var splayTree;

    it('should create new splay tree', function() {
        expect(new SplayTree()).to.be.instanceof(SplayTree);
    });

    beforeEach(function() {
        splayTree = new SplayTree();
    });

    it ('should insert new element', function() {
        var key   = 'someKey';
        var value = 1234124345;

        expect(splayTree.set(key, value)).to.be.equal(splayTree);
        expect(splayTree.root).to.be.equal(value);
    });

    it ('should splay by key', function() {
        var values = [1,2,3,4,5,6,7,8];

        values.forEach(function(value, index) {
            splayTree.set(index, value);
            expect(splayTree.root).to.be.equal(value);
        });

        expect(splayTree.splay(4)).to.be.equal(splayTree);
        expect(splayTree.root).to.be.equal(values[4]);
    });
});