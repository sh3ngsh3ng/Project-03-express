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
  return db.createTable('order_items', {
    id: {type: 'int', primaryKey: true, autoIncrement: true, unsigned: true},
    order_item_quantity: {type:'int'},
    order_item_status: {type: 'string', length: '45', notNull: true},
    order_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "order_items_order_id",
        table: 'orders',
        rules: {
          onDelete: 'cascade',
          onUpdate: 'restrict'
        },
        mapping: 'id'
      }
    },
    product_slots_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "order_items_product_slots_id",
        table: 'product_slots',
        rules: {
          onDelete: 'cascade',
          onUpdate: 'restrict'
        },
        mapping: 'id'
      }
    }

  })
};

exports.down = function(db) {
  return db.dropTable('order_items')
};

exports._meta = {
  "version": 1
};
