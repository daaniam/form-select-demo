<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';

	import SuperDebug from 'sveltekit-superforms';
	import { getProductsByCategoryId } from './fakedb';

	console.log('called: PAGE');

	let { data }: { data: PageData } = $props();

	const { form, enhance } = superForm(data.form, {
		// validators: zod(zodProduct)
	});

	let showProducts = $derived.by(async () => {
		const products = await getProductsByCategoryId(Number($form.category_id));
		return products;
	});

	$effect(() => {
		$inspect($form);
	});
</script>

<SuperDebug data={$form} />

<div>
	<form method="POST">
		<div class="flex flex-row gap-4">
			<div class="">
				<label for="category-select">Product category:</label>
				<select class="select" name="category-select" bind:value={$form.category_id}>
					{#each data.categories as category}
						<option value={category.id}>{category.name}</option>
					{/each}
				</select>
				<div>Category ID: {$form.category_id}</div>
			</div>

			<div>
				{#await showProducts}
					<option selected>Loading...</option>
				{:then products}
					<label for="product-select">Product category:</label>
					<select class="select" name="product-select" bind:value={$form.product_id}>
						{#each products as p}
							<option value={p.id}>{p.name}</option>
						{/each}
					</select>
				{/await}
				<div>Product ID: {$form.product_id}</div>
			</div>
		</div>
	</form>
</div>
