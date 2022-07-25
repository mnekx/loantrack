const path = require('path');

const helpers = {};

helpers.saveUploadedFiles = (filePath, file, callback) => {
  try {
    file.mv(filePath, (err) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, filePath);
      }
    });
  } catch (error) {
    callback(error, null);
  }
};

module.exports = helpers;
