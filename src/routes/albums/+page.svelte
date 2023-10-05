<script>
	import { fade } from 'svelte/transition';

	export let data;
	$: ({ albums } = data.albums);
</script>

<div class="container">
	<div class="album-grid">
		{#await data.albums}
			{#each Array(6) as _}
				<div class="loading">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
			{/each}
		{:then { albums }}
			{#each albums.slice(1, albums.length) as album}
				<a href="/albums/{album.id}?q=12" in:fade={{ duration: 200 }} out:fade={{ duration: 100 }}>
					<div class="album-card shadow-xl shadow-gray-950/75">
            <figure>
              <img src={album.coverPhoto} alt={album.title} class="w-full h-full object-cover" />
              <figcaption class="absolute z-10 top-3 right-3 badge">
                <span class="text-white dark:text-gray-900">{album.quantity}</span>
              </figcaption>
            </figure>
            <div class="title rounded-lg border border-slate-100/30 dark:border-slate-700/30 bg-gray-100/40 dark:bg-gray-950/50 backdrop-blur-md shadow-lg shadow-zinc-900/50">
              <h2>{album.title}</h2>
            </div>
          </div>
				</a>
			{/each}
		{:catch error}
			<p>Could not load albums...</p>
		{/await}
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

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-block-size: 420px;    
  }

  .album-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;
		background: var(--gradient-16);
		position: relative;
	}
	.album-card figure {
		position: relative;
		width: 100%;
		min-height: 420px;
		overflow: hidden;
		& figcaption {
			position: absolute;
			top: 1em;
			right: 1em;
			font-size: var(--font-size-fluid-0);
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0.5rem;
			width: 2.5rem;
			height: 2.5rem;
			border-radius: 50%;
			background: var(--gradient-21);
			& span {
				display: inline-flex;
			}
		}
		& img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.title {
		position: absolute;
		bottom: 1em;
		left: 1em;
		width: fit-content;
		padding: var(--size-fluid-1) var(--size-fluid-2);
		/* background-color: rgba(33, 33, 33, 0.25); */
	}
</style>
