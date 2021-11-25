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
  return db.createTable('vendors', {
    id: {type: 'int', primaryKey: true, autoIncrement: true, unsigned: true},
    vendor_name: {type: 'string', length: '45', notNull: true},
    vendor_phone: {type: 'string', length: '45', notNull: true},
    username: {type: 'string', length: '45', notNull: true},
    password: {type: 'string', length: '45', notNull: true}
  })
};

exports.down = function(db) {
  return db.dropTable('vendors')
};

exports._meta = {
  "version": 1
};
