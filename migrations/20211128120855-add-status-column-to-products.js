'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.addColumn('products', 'product_status', {
    type:"string",
    length: "255",
    required: true
  })
};

exports.down = function(db) {
  return db.removeColumn('products', 'product_status')
};

exports._meta = {
  "version": 1
};
