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
  return db.addColumn('cart_items', 'product_slots_id', {
    type: 'int',
    unsigned: true,
    notNull: true,
    foreignKey: {
      name: 'cart_items_product_slots_id',
      table: "product_slots",
      rules: {
        onDelete: 'cascade',
        onUpdate: 'restrict'
      },
      mapping: 'id'
    }
  })
};

exports.down = function(db) {
  return db.removeForeignKey('cart_items', 'cart_items_product_slots_id').then(()=>{
    db.removeColumn('cart_items', 'product_slots_id')
  })
};

exports._meta = {
  "version": 1
};
