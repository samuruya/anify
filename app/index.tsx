import { Redirect } from "expo-router";
import { Platform } from 'react-native'
import {BSON} from 'realm';
import { useQuery, useRealm } from "@realm/react";
import { WatchProgressSeason } from './realmModels'
import { setWatchProgressSeason } from './db'


export default function StartScreen() {
    const realm = useRealm();

    const deleatAll = () => {
        realm.write(() => {
            realm.deleteAll();
          });
    }
    const addSeasonWatchProgress = () => {
        realm.write(() => {
            realm.create(WatchProgressSeason, {
                _id: new BSON.UUID(),
                id: 'jujutsu-kaisen-2nd-season-18413?ep=103235',
                time: 14.43,
                length: 25.32,
            });
        });
    };
   

    
    // deleatAll()
    // setWatchProgressSeason(realm, 'jujutsu-kaisen-2nd-season-18413?ep=103235', 14.43, 25.32)
    // console.log("realmDB:", useQuery("WatchProgressSeason"));
    return <Redirect href="/screen/home" />
    // return <Redirect href="/screen/profile" />
}

// DB_Stuff
