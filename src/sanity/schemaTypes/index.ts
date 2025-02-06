import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import category from './category'
import shipping from './shipping'
import cartitem from './cartItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, shipping, cartitem ],
}
