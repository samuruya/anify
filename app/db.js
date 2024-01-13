import { BSON } from 'realm';
import { useQuery, useRealm } from "@realm/react";
import { WatchProgressSeason, ContinueWatching, WatchProgressMovie } from './realmModels'

// const realm = useRealm();

export function getWatchProgressSeason(seasonId){
    // console.log("seasonId", seasonId);
    const cwObj = {
        episodeId: 'jujutsu-kaisen-2nd-season-18413?ep=103235',
        time: 896226,
        length: 1435025
    }
    return cwObj
}
export function setWatchProgressSeason(realm, episodeId, time, length){
    realm.write(() => {
        realm.create(WatchProgressSeason, {
            _id: new BSON.UUID(),
            episodeId: episodeId,
            time: time,
            length: length,
        });
    });
}


export async function getWatchProgressMovie(movieId){
    console.log("movieId", movieId);
}
export async function getContinueWatching(titleId){
    // console.log("titleId", titleId);
    const cwObj = {
        episodeId: 'jujutsu-kaisen-2nd-season-18413?ep=103235',
        time: 14.32,
        length: 25.32,
        url: 'https://eno.tendoloads.com/_v6/82749ab5ec9ebd2c517d0d7cb4cab7aac585b1023129020d2ed83ce681d41b30dffacdcb6f4b5a03a06d3c4a4d7206410f7fe0918c25ba0d3616fa42945eeeb9e07470e2199c15c388870182b73aeb5ca7ac36dc91ef91323dd386a465bc5eac30fdae67d2fcc5e32f6d8b30d0bba21199a1a206918708df035fcefab33e4e10/master.m3u8',
        poster: 'https://img.flawlessfiles.com/_r/300x400/100/b5/1f/b51f863b05f30576cf9d85fa9b911bb5/b51f863b05f30576cf9d85fa9b911bb5.png',
        title: 'Hidden Inventory 2',
        number: 2,
    }
    
    if(titleId){
        return cwObj
    }else{
        return [cwObj]
    }
}
export function setContinueWatching(realm, titleId, episodeId, title, eNumber, time, length, url, posterUrl){
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