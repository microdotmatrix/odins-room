<script>
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { afterNavigate, goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import john from '$lib/images/john.jpg';
	import hayley from '$lib/images/hayley.jpg';

	
	export let data;
	$: images = data.images;
	$: albumId = data.albumId;
	
	let limit = writable(12);
	$: pageSize = $page.url.searchParams.get('q');

	let gridRows = writable(4);

	const loadMore = () => {
		limit.update((n) => n + 12);
		goto(`?q=${$limit}`, {
			replaceState: false,
			noScroll: true
		});
		gridRows.update((n) => n + 3);
	};

	/** @type { HTMLElement}  */
	let container;

	/** @type {import('./$types').Snapshot} */
	export const snapshot = {
		capture: () => {
			// we need to manually restore the scroll of the parent element
			// SvelteKit won't, because it's not the window scroll
			// TODO: is this better in an afterNavigate/afterTransition?
			return container.parentElement?.scrollTop;
		},
		restore: (scrollTop) => {
			if (container.parentElement) {
				container.parentElement.scrollTop = scrollTop;
			}
		}
	};

	const { transition } = setupViewTransition();
</script>

{#key $page.url.pathname}
	<div
		class="gallery container"
		style:--grid-rows={$gridRows}
		bind:this={container}
		in:fade={{ duration: 300 }}
		out:fade={{ duration: 300 }}
	>
		{#await data.images}
			{#each Array(12) as _}
				<div class="gallery-cell">
					<span class="loading loading-ring loading-lg"></span>
				</div>
			{/each}
		{:then { images }}
			{#each images.slice(0, pageSize) as image (image.id)}
				{@const href = `/albums/${albumId}/images/${image.id}`}
				<div 
					class="gallery-cell"
					use:transition={{
						name({ navigation }) {
							return navigation?.from?.params?.imageId === image.id.toString() ? `image-${image.id}` : 'wrapper'
						},
						applyImmediately({ navigation }) {
							return navigation?.from?.params?.imageId === image.id.toString()
						},
						shouldApply({ navigation }) {
							return navigation?.to?.params?.imageId === image.id.toString()
						}
					}}
				>
					<a {href} class="relative group">
            <img
              src={`${image.src}`}
              alt={image.title}
              height={image.height}
              width={image.width}
              loading="lazy"
            />
						<div class="absolute top-2 right-2">
							<span class="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M222 104a6 6 0 0 1-12 0V54.49l-69.75 69.75a6 6 0 0 1-8.48-8.48L201.51 46H152a6 6 0 0 1 0-12h64a6 6 0 0 1 6 6Zm-38 26a6 6 0 0 0-6 6v72a2 2 0 0 1-2 2H48a2 2 0 0 1-2-2V80a2 2 0 0 1 2-2h72a6 6 0 0 0 0-12H48a14 14 0 0 0-14 14v128a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14v-72a6 6 0 0 0-6-6Z"/></svg></span>
						</div>
						<div class="absolute bottom-3 left-3 avatar">
							<div class="w-10 opacity-75 group-hover:opacity-100 grayscale-[50%] group-hover:grayscale-0 rounded-full shadow-lg shadow-gray-950 ring ring-primary/20 hover:ring-accent/40 transition-all duration-500 ring-offset-base-100 ring-offset-2">
								{#if image?.camera === "Apple"}
									<img src={john} alt="Taken by Dad" height="48" width="48" />
								{:else}
									<img src={hayley} alt="Taken by Dad" height="48" width="48" />
								{/if}
							</div>
						</div>
          </a>
				</div>
			{/each}
			{#if $limit < images.length}
				<button
					class="btn btn-primary"
					on:click={loadMore}
				>
					Load More
				</button>
			{/if}
		{:catch error}
			<p>Could not load images...</p>
		{/await}
	</div>
{/key}

<style>
	.gallery {
		--grid-rows: 4;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		grid-template-rows: repeat(1, 220px);
		grid-auto-rows: 1fr;
		grid-auto-flow: dense;
		grid-gap: 0.25rem;
		padding: 0;
		@media (min-width: 1024px) {
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
			grid-template-rows: repeat(var(--grid-rows), 300px);
			grid-gap: 0.5rem;
		}

		& .loading {
			display: flex;
			align-items: center;
			justify-content: center;
			grid-column: span 1;
			grid-row: span 1;
		}

		& .gallery-cell {
			grid-column: span 1;
			grid-row: span 1;
			position: relative;

      & a > img {
        display: flex;
        width: 100%;
        height: 100%;
        border-radius: 0;
        object-fit: cover;
        object-position: center;
      }
		}
	}
	.gallery .gallery-cell:nth-child(1) {
		grid-column: span 2;
		grid-row: span 2;
	}
	.gallery .gallery-cell:nth-child(4n) {
		grid-column: span 2;
		grid-row: span 2;
	}

	.gallery .gallery-cell:last-of-type {
		grid-column: span 1;
		grid-row: span 1;
	}

	.load-more {
		display: flex;
		width: fit-content;
		height: fit-content;
		margin: auto;
		text-transform: uppercase;
		font-size: 1.25rem;
		padding: var(--size-fluid-1) var(--size-fluid-3);
		background: var(--text-1);
		color: var(--surface-3);
		border-radius: var(--size-1);
		border: none;
		transition: color 200ms ease, background 400ms ease, box-shadow 400ms ease;
		&:hover {
			color: var(--surface-1);
			background: var(--text-2);
		}
	}
</style>
