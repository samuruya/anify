import { BSON } from 'realm';
import { WatchProgressSeason, ContinueWatching, WatchProgressMovie } from './realmModels'


export function setWatchProgressSeason(realm, episodeId, time, length){
    const toUpdate = realm.objects(WatchProgressSeason).filtered('episodeId == $0', episodeId)[0]

    if(toUpdate !== undefined) {
        console.info("Realm: Update Season");
        realm.write(() => {
            toUpdate.time = time,
            toUpdate.length = length
          });

    }else{
        console.info("Realm: Create Season");
        realm.write(() => {
            realm.create(WatchProgressSeason, {
                _id: new BSON.UUID(),
                episodeId: episodeId,
                time: time,
                length: length
            });
        });
    }
    
}


export function setContinueWatching(realm, titleId, episodeId, title, eNumber, time, length, url, posterUrl){

    const toUpdate = realm.objects(ContinueWatching).filtered('id == $0', titleId)[0]

    if (toUpdate !== undefined) {
        console.info("Realm: Update Continue");
        realm.write(() => {
            toUpdate.episodeId = episodeId,
            toUpdate.title = title,
            toUpdate.number = eNumber,
            toUpdate.time = time,
            toUpdate.length = length,
            toUpdate.url = url,
            toUpdate.datetime = new Date()
          });

    }else{
        console.info("Realm: Create Continue");
        realm.write(() => {
            realm.create(ContinueWatching, {
                _id: new BSON.UUID(),
                id: titleId,
                episodeId: episodeId,
                title: title,
                number: eNumber,
                time: time,
                length: length,
                url: url,
                posterUrl: posterUrl,
                datetime: new Date()
            });
        });
    }

    
}