import type { Product, Category } from './schema';

// Utils
function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// Some data
const someFruits = [
	{ id: 1, category_id: 1, name: 'Apple', price: 55 },
	{ id: 2, category_id: 1, name: 'Banana', price: 30 },
	{ id: 3, category_id: 1, name: 'Orange', price: 40 }
];

const someVegetables = [
	{ id: 1, category_id: 2, name: 'Carrot', price: 25 },
	{ id: 2, category_id: 2, name: 'Potato', price: 15 },
	{ id: 3, category_id: 2, name: 'Broccoli', price: 35 }
];

const someCategories = [
	{ id: 1, name: 'Fruits' },
	{ id: 2, name: 'Vegetables' }
];

const productCategoryMapping = {
	1: someFruits,
	2: someVegetables
};

// API
export const getCategories = async (): Promise<Category[]> => {
	await delay(1000);
	return someCategories;
};

export const getFruits = async (): Promise<Product[]> => {
	await delay(1000);
	return someFruits;
};

export const getVegetables = async (): Promise<Product[]> => {
	await delay(1000);
	return someVegetables;
};

export const getProductsByCategoryId = async (category_id: number): Promise<Product> => {
	await delay(1000);
	return productCategoryMapping[category_id];
};
