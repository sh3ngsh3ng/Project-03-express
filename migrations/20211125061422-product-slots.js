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
  return db.createTable('product_slots', {
    id: {type: 'int', primaryKey: true, autoIncrement: true, unsigned: true},
    slot_date: {type: 'date'},
    slot_time: {type: 'timestamp'},
    slot_availability: {type: 'int'},
    slot_quantity: {type: 'int'},
    product_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'product_slot_product_id',
        table: 'products',
        rules: {
          onDelete: 'cascade',
          onUpdate: 'restrict'
        },
        mapping: "id"
      }
    }

  })
};

exports.down = function(db) {
  return db.dropTable('product_slots')
};

exports._meta = {
  "version": 1
};
