<script>
	import { limit, gridRows } from '$lib/stores';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { smoothload } from '$utils/load';
	import * as Icon from '$components/icons';
	import john from '$lib/images/john.jpg';
	import hayley from '$lib/images/hayley.jpg';
	
	export let data;
	$: ({ images } = data.images);
	$: albumId = data.albumId;
	$: meta = data.meta;
	
	$: pageSize = $page.url.searchParams.get('q');
	
	const loadMore = () => {
		limit.update((n) => n + 12);
		goto(`?q=${$limit}`, {
			replaceState: false,
			noScroll: true
		});
		gridRows.update((n) => n + 2);
	};

	/** @type { HTMLElement}  */
	let container;

	/** @type {import('./$types').Snapshot} */
	export const snapshot = {
		capture: () => {
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

<svelte:head>
	<title>{meta.title} - {meta.quantity} photos - Odin's Room</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#key $page.url.pathname}
	<div class="absolute z-50 top-9 lg:top-[3.8rem] left-12 lg:left-[8vw] hidden md:flex items-center">
		<button 
			class="btn w-fit px-1 mr-4" 
			on:click={() => goto('/albums')}
			in:fly={{ x: 100, delay: 500, duration: 300 }}
		>
			<Icon.LeftArrow class="w-8 h-8" />
			<span class="sr-only">Back to Albums</span>
		</button>
		<h2>{meta.title}</h2>
		<span class="badge lg:text-lg ml-4 w-7 h-7 lg:h-10 lg:w-10 bg-accent dark:bg-primary">{meta.quantity}</span>
	</div>
	<div
		class="gallery"
		
		bind:this={container}
		in:fade={{ duration: 300 }}
		out:fade={{ duration: 300 }}
	>	
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
				<a {href} class="relative group gallery-image">
					<img
						src={`${image.src}`}
						alt={image.title}
						height={image.height}
						width={image.width}
						loading="lazy"
						use:smoothload
					/>
					<div class="absolute top-2 right-2">
						<span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<Icon.Expand class="text-neutral group-hover:text-primary transition-colors duration-300 delay-100" />
							<span class="sr-only">Open Image</span>
						</span>
					</div>
					<div class="absolute bottom-3 left-3 avatar" in:fade={{ delay: 1200, duration: 200 }} out:fade={{ duration: 100 }}>
						<div class="w-10 opacity-85 group-hover:opacity-100 grayscale-[50%] group-hover:grayscale-0 rounded-full shadow-lg shadow-gray-950 ring ring-primary/20 hover:ring-accent/40 transition-all duration-500 ring-offset-base-100 ring-offset-2">
							{#if image?.camera === "Apple"}
								<img src={john} alt="Taken by Dad" height="48" width="48" use:smoothload />
							{:else}
								<img src={hayley} alt="Taken by Mom" height="48" width="48" use:smoothload />
							{/if}
						</div>
					</div>
				</a>
			</div>
		{/each}
		{#if $limit < images.length}
			<button
				class="btn btn-lg btn-neutral tracking-wider"
				on:click={loadMore}
			>
				Load More
				<Icon.DownArrows class="w-6 h-6" />
			</button>
		{/if}
	</div>
{/key}

<style>
	/* .gallery {
		--grid-rows: 4;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		grid-template-rows: repeat(1, 420px);
		grid-auto-rows: 1fr 1fr;
		grid-auto-flow: dense;
		grid-gap: 0.1rem;
		padding: 0;
		
		@media (min-width: 1024px) {
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
			grid-template-rows: repeat(var(--grid-rows), 320px);
			grid-gap: 0.25rem;
		}

		& .loading {
			display: flex;
			align-items: center;
			justify-content: center;
			grid-column: span 1;
			grid-row: span 1;
		}

	}
	.gallery .gallery-cell {
		grid-column: span 1;
		grid-row: span 1;
		position: relative;

		& .gallery-image > img {
			display: flex;
			width: 100%;
			height: 100%;
			border-radius: 0;
			object-fit: cover;
			object-position: center;
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
	} */
	.gallery {
		--gap: 2px;
		columns: 2;
		column-gap: var(--gap);
		& > * {
			margin-bottom: var(--gap);
			& .gallery-image {
				& img {
					display: flex;
					width: 100%;
					height: 100%;
					border-radius: 0;
					border-radius: 0;
					object-fit: cover;
					object-position: center;
				}
			}
		}
		@media (min-width: 768px) {
			columns: 3;
		}
		@media (min-width: 1024px) {
			--gap: 4px;
			columns: 4;
		}
		@media (min-width: 1280px) {
			columns: 5;
		}
		@media (min-width: 1536px) {
			--gap: 0.25rem;
			columns: 6;
		}
	}
</style>
