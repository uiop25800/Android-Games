const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaFavorite = Schema({
  userId: {
    type: String,
    require: true,
  },
  gameId: {
    type: String,
    require: true,
  },
  gameName: {
    type: String,
    require: true,
  },
  gameImage: {
    type: String,
    require: true,
  },
  fullDetail: {
    type: String,
    require: true,
  },
  imageDetail: {
    type: String,
    require: true,
  },
  videoYoutubeId: {
    type: String,
    require: true,
  },
});

module.exports =mongoose.model('favorite',SchemaFavorite);