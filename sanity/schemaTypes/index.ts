import type { SchemaTypeDefinition } from 'sanity'

import { authorType } from './authorType'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { homePageType } from './homePageType'
import { postType } from './postType'

export const schemaTypes: SchemaTypeDefinition[] = [
  authorType,
  blockContentType,
  categoryType,
  homePageType,
  postType,
]
