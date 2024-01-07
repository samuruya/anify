import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
  tableSchema({
    name: 'watchProgressSeason',
    columns: [
        { name: 'seasonId', type: 'string', isIndexed: true },
        { name: 'episodeId', type: 'string', isIndexed: true },
        { name: 'time', type: 'number' }
      ]
  }),
  tableSchema({
    name: 'watchProgressMovie',
    columns: [
        { name: 'movieId', type: 'string', isIndexed: true },
        { name: 'time', type: 'number' }
      ]
  }),
  tableSchema({
    name: 'continueWatching',
    columns: [
        { name: 'titleId', type: 'string' },
        { name: 'time', type: 'number' },
        { name: 'link', type: 'string' }
      ]
  })

  ]
})