
export class WatchProgressSeason extends Realm.Object {

  static primaryKey = "_id";
  static schema = {
    name: "WatchProgressSeason",
    primaryKey: "_id",
    properties: {
      _id: 'uuid',
      episodeId: {
        type: "string",
        indexed: true,
      },
      time: "int",
      length: "int",
    },
  };

}

export class WatchProgressMovie extends Realm.Object {

  static primaryKey = "_id";
  static schema = {
    name: "WatchProgressMovie",
    primaryKey: "_id",
    properties: {
      _id: 'uuid',
      id: {
        type: "string",
        indexed: true,
      },
      time: "int",
      length: "int",
    },
  };

  
}

export class ContinueWatching extends Realm.Object {

  static primaryKey = "_id";
  static schema = {
    name: "ContinueWatching",
    primaryKey: "_id",
    properties: {
      _id: 'uuid',
      id: {
        type: "string",
        indexed: true,
      },
      episodeId: {
        type: "string",
        indexed: true,
      },
      title: 'string',
      number: 'int',
      time: "int",
      length: "int",
      url: 'string',
      posterUrl: 'string',
      datetime: 'date',
    },
  };

  
}