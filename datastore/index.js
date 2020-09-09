const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// No longer need this, store in file system instead
// var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

// var fileNameList = {id: 0, text: ''};
// Do something here to iterate over files in data and add their names and text into fileNameList

exports.create = (text, callback) => {
  var id = counter.getNextUniqueId(() => {});
  var path = './datastore/data' + id + '.txt'
  fs.writeFile(path, text, [], (err, file) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, file)
      console.log('Todo item saved!')
    }
  });
};

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
