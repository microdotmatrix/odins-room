<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { smoothload } from '$utils/load';

	export let data;
	$: ({ albums } = data.albums);
</script>

<div class="container">
	<div class="album-grid">
		{#if $page.data.session}
			{#each albums.slice(0,1) as album}
				<a href="/albums/{album.id}?q=12" in:fade={{ duration: 200 }} out:fade={{ duration: 100 }}>
					<div class="album-card shadow-xl shadow-gray-950/75">
						<figure>
							<img src={album.coverPhoto} alt={album.title} class="w-full h-full object-cover" use:smoothload />
							<figcaption class="count absolute z-10 top-3 right-3 badge bg-accent p-3 h-10 w-10">
								<span class="text-white dark:text-gray-900">{album.quantity}</span>
							</figcaption>
						</figure>
						<div class="title rounded-lg border border-slate-100/30 dark:border-slate-700/30 bg-gray-100/40 dark:bg-gray-950/50 backdrop-blur-md shadow-lg shadow-zinc-900/50">
							<h2>{album.title}</h2>
						</div>
					</div>
				</a>
			{/each}
			{#each albums.slice(2, albums.length) as album}
				<a href="/albums/{album.id}?q=12" in:fade={{ duration: 200 }} out:fade={{ duration: 100 }}>
					<div class="album-card shadow-xl shadow-gray-950/75">
						<figure>
							<img src={album.coverPhoto} alt={album.title} class="w-full h-full object-cover" use:smoothload />
							<figcaption class="count absolute z-10 top-3 right-3 badge bg-accent p-3 h-10 w-10">
								<span class="text-white dark:text-gray-900">{album.quantity}</span>
							</figcaption>
						</figure>
						<div class="title rounded-lg border border-slate-100/30 dark:border-slate-700/30 bg-gray-100/40 dark:bg-gray-950/50 backdrop-blur-md shadow-lg shadow-zinc-900/50">
							<h2>{album.title}</h2>
						</div>
					</div>
				</a>
			{/each}
		{:else}
			Login to see photo albums
		{/if}
	</div>
</div>

<style>
	.album-grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		grid-gap: 1.5rem;
		@media (min-width: 768px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		@media (min-width: 1280px) {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

  .album-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;
		
		position: relative;
		& .title {
			position: absolute;
			bottom: 1em;
			left: 1em;
			width: fit-content;
			padding: var(--size-fluid-1) var(--size-fluid-2);
		}
	}

	figure {
		position: relative;
		width: 100%;
		min-height: 420px;
		& img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	figure .count > span {
		display: inline-flex;
		font-size: var(--font-size-fluid-0);
		font-weight: 600;
	}
</style>
