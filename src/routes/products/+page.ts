import type { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { getCategories } from './fakedb';
import { formSchema } from './schema';

export const load = (async ({ fetch, params, url }) => {
	console.log('called: LOAD');

	const categories = await getCategories();

	const form = await superValidate(zod(formSchema));

	return { form, categories: categories };
}) satisfies PageLoad;
