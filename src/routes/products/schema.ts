import { z } from 'zod';

export const CategorySchema = z.object({
	id: z.number(),
	name: z.string()
});

export const ProductSchema = z.object({
	id: z.number(),
	category_id: z.number(),
	name: z.string(),
	price: z.number()
});

export const formSchema = z.object({
	category_id: z.number().optional(),
	product_id: z.number().optional()
});

// as List
export const CategoryListSchema = z.array(CategorySchema);
export const ProductListSchema = z.array(ProductSchema);

// as Type
export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type CategoryList = z.infer<typeof CategoryListSchema>;
export type ProductList = z.infer<typeof ProductListSchema>;
