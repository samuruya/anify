import { Redirect } from "expo-router";
import { Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './model/schema'
import migrations from './model/migrations'
import WatchProgressSeason from './model/WatchProgressSeason'
import WatchProgressMovie from './model/WatchProgressMovie'
import ContinueWatching from './model/ContinueWatching'

export default function StartScreen() {
    return <Redirect href="/screen/home" />
    // return <Redirect href="/screen/profile" />
}

// DB_Stuff
// const adapter = new SQLiteAdapter({
//     schema,
//     migrations,
//     // dbName: 'database',
//     jsi: false, /* Platform.OS === 'ios' */
   
//     onSetUpError: error => {
//         console.error(error)
//       // Database failed to load -- offer the user to reload the app or log out
//     }
//   })
  
//   const database = new Database({
//     adapter,
//     modelClasses: [
//       WatchProgressSeason,
//       WatchProgressMovie,
//       ContinueWatching
//     ],
//   })