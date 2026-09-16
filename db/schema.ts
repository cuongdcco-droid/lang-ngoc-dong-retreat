import {sqliteTable,integer,text} from 'drizzle-orm/sqlite-core';
export const content=sqliteTable('site_content',{id:integer('id').primaryKey(),draft:text('draft').notNull(),published:text('published').notNull(),revision:integer('revision').notNull().default(0),publishedAt:text('published_at')});
