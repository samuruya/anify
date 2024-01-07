import { schemaMigrations, createTable } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        // See "Migrations API" for more details
        createTable({
          name: 'watchProgressSeason',
          columns: [
              { name: 'seasonId', type: 'string', isIndexed: true },
              { name: 'episodeId', type: 'string', isIndexed: true },
              { name: 'time', type: 'number' }
            ]
        }),
        createTable({
          name: 'watchProgressMovie',
          columns: [
              { name: 'movieId', type: 'string', isIndexed: true },
              { name: 'time', type: 'number' }
            ]
        }),
        createTable({
          name: 'continueWatching',
          columns: [
              { name: 'titleId', type: 'string' },
              { name: 'time', type: 'number' },
              { name: 'link', type: 'string' }
            ]
        })

      ],
    },
  ],
})