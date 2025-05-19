<script lang="ts">
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms";

  import SuperDebug from "sveltekit-superforms";
  import { getProductsByCategoryId } from "./fakedb";
  import { onMount } from "svelte";

  console.log("called: PAGE");

  let { data }: { data: PageData } = $props();

  // TODO: Need proper types
  let showProducts = $state();

  onMount(async () => {
    showProducts = await getProductsByCategoryId(Number($form.category_id));
  });

  const { form, enhance } = superForm(data.form, {
    async onChange(event) {
      if (event.paths[0] !== "category_id") return;
      // TODO: Reset product_id here if needed
      showProducts = undefined;
      showProducts = await getProductsByCategoryId(Number($form.category_id));
    },
  });

  $effect(() => {
    $inspect($form);
  });
</script>

<SuperDebug data={$form} />

<div>
  <form method="POST" use:enhance>
    <div class="flex flex-row gap-4">
      <div class="">
        <label for="category-select">Product category:</label>
        <select
          class="select"
          name="category-select"
          bind:value={$form.category_id}
        >
          {#each data.categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
        <div>Category ID: {$form.category_id}</div>
      </div>

      <div>
        {#if !showProducts}
          <option selected>Loading...</option>
        {:else}
          <label for="product-select">Product:</label>
          <select
            class="select"
            name="product-select"
            bind:value={$form.product_id}
          >
            {#each showProducts as p}
              <option value={p.id}>{p.name}</option>
            {/each}
          </select>
        {/if}
        <div>Product ID: {$form.product_id}</div>
      </div>
    </div>
  </form>
</div>
