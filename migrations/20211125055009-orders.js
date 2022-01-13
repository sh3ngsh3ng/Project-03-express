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
  return db.createTable('orders', {
    id: {type: 'int', primaryKey: true, autoIncrement: true, unsigned: true},
    order_date: {type: 'datetime'},
    order_total_cost: {type: 'int'},
    order_status: {type: 'string', length: '45'}
  })
};

exports.down = function(db) {
  return db.dropTable('orders')
};

exports._meta = {
  "version": 1
};
