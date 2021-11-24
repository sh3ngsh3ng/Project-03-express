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
  return db.createTable('products', {
    id: {type:'int', primaryKey: true, autoIncrement:true, unsigned: true},
    product_name: {type:'string', length: '45', notNull: false},
    product_price: {type:'int'},
    product_description: {type:'string', length: '500'}
  })
};

exports.down = function(db) {
  return db.dropTable('products')
};

exports._meta = {
  "version": 1
};
