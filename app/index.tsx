import { Redirect } from "expo-router";
import { useQuery, useRealm, Realm } from "@realm/react";
import { WatchProgressSeason, ContinueWatching, WatchProgressMovie, Settings } from './realmModels'

export default function StartScreen() {
 
    return <Redirect href="/screen/home" />
    // return <Redirect href="/screen/profile" />
}

