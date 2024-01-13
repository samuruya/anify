import { BSON } from 'realm';
import { useQuery, useRealm } from "@realm/react";
import { WatchProgressSeason, ContinueWatching, WatchProgressMovie } from './realmModels'


export function setWatchProgressSeason(realm, episodeId, time, length){
    const toUpdate = realm.objects(ContinueWatching).filtered('id == $0', episodeId)[0]

    if(toUpdate !== undefined) {
        console.info("Realm: Update");
        realm.write(() => {
            toUpdate.episodeId = episodeId,
            toUpdate.time = time,
            toUpdate.length = length
          });
    }else{
        console.info("Realm: Create");
        realm.write(() => {
            realm.create(WatchProgressSeason, {
                _id: new BSON.UUID(),
                episodeId: episodeId,
                time: time,
                length: length,
            });
        });
    }
    
}


export async function getWatchProgressMovie(movieId){
    console.log("movieId", movieId);
}

export function setContinueWatching(realm, titleId, episodeId, title, eNumber, time, length, url, posterUrl){

    const toUpdate = realm.objects(ContinueWatching).filtered('id == $0', titleId)[0]

    if (toUpdate !== undefined) {
        console.info("Realm: Update");
        realm.write(() => {
            toUpdate.episodeId = episodeId,
            toUpdate.title = title,
            toUpdate.number = eNumber,
            toUpdate.time = time,
            toUpdate.length = length,
            toUpdate.url = url
          });

    }else{
        console.info("Realm: Create");
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
            });
        });
    }

    
}