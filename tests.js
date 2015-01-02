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

    var hash = {
        'key1': 'value1',
        'key2': 'value2',
        1234:   'asdf'
    };

    var list = [1,2,3,4,5,6,7,8];

    it ('should insert new element with splaying', function() {
        var key   = 'someKey';
        var value = 1234124345;

        expect(splayTree.set(key, value)).to.be.equal(splayTree);
        expect(splayTree.root).to.be.equal(value);
    });

    it ('should get elements by key with splaying', function() {

        list.forEach(function(value, index) {
            splayTree.set(index, value);
            expect(splayTree.root).to.be.equal(value);
        });

        list.forEach(function(value, index) {
            expect(splayTree.get(index)).to.be.equal(value);
            expect(splayTree.root).to.be.equal(value);
        });
    });

    it ('should check element for existence with splaying', function() {
        var key;

        for (key in hash) {
            expect(splayTree.set(key, hash[key])).to.be.equal(splayTree);
            expect(splayTree.root).to.be.equal(hash[key]);
        }

        for (key in hash) {
            expect(splayTree.has(key)).to.be.true;
            expect(splayTree.root).to.be.equal(hash[key]);
        }

        expect(splayTree.has('key3')).to.be.false;
        expect(splayTree.root).to.be.equal(hash['key2']);
    });

    it ('should remove element by key with splying', function() {

        list.forEach(function(value, index) {
            expect(splayTree.set(index, value)).to.be.equal(splayTree);
            expect(splayTree.root).to.be.equal(value);
        });

        list.forEach(function(value, index) {
            expect(splayTree.has(index)).to.be.true;
        });

        expect(splayTree.remove(5));

        list.forEach(function(value, index) {
            if (5 === index) {
                expect(splayTree.has(index)).to.be.false;
            }
            else {
                expect(splayTree.has(index)).to.be.true;
            }
        })
    });
});