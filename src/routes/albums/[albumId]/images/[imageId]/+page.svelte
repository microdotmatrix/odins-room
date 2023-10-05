<script>
  import { page } from '$app/stores';
  import { formatDate } from '$utils/helpers';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
  import { fade, fly } from 'svelte/transition';
  import john from '$lib/images/john.jpg';
  import hayley from '$lib/images/hayley.jpg';
	import { setupViewTransition } from 'sveltekit-view-transition';

  /** @type {import('./$types').PageData} */
  export let data;
  
  $: imageId = data.imageId
  $: ({ images } = data.images);
  $: image = images.find((/** @type {{ id: string | undefined; }} */ image) => image.id === imageId);

  const { transition } = setupViewTransition();
</script>

<div class="container">
  <div class="view-wrapper flex flex-col lg:flex-row">
    <figure class="image-view" use:transition={`wrapper`}>
      {#await data.images}
        <div class="w-full h-full m-auto grid place-content-center">
          <span class="loading loading-ring loading-lg"></span>
        </div>
      {:then { images }}
        {#if image.mimeType === 'video/mp4'}
          <video
            controls
            autoPlay
            muted
            class="object-contain object-center w-full h-full m-auto"
            style="max-height: 100vh"
            
          >
            <source src={`${image.src}=dv` || null} type="video/mp4" />
            <track kind="captions" />
          </video>
        {:else}
          <img 
            src="{image.src}" 
            alt={image.title} 
            height={image.height} 
            width={image.width} 
            loading="eager"
            
          />
        {/if}
      {:catch error}
        <p>Could not load image...</p>
      {/await}
    </figure>

    <div class="image-details">
      <button 
        class="btn btn-secondary w-fit go-back" 
        on:click={() => history.back()}
        in:fly={{ x: 100, delay: 500, duration: 300 }}
      >
        Back
        <span class="sr-only">Back to Album</span>
      </button>
      <div class="date" in:fade={{ duration: 400 }} out:fade={{ duration: 100 }}>
        <h1 in:fly={{ x: 100, delay: 800, duration: 500 }} out:fade>{formatDate(image.createdAt)}</h1>
        <div class="flex flex-row items-center gap-3 text-2xl font-sans" in:fly={{ y: 20, delay: 1200, duration: 300 }}>
          Taken by: 
          <span class="flex flex-row items-center gap-2" in:fade={{ delay: 1800 }}>
            {#if image?.camera === "Apple"}
              Dad
              <div class="w-16 h-16 rounded-full overflow-hidden">
                <img src={john} alt="Taken by Dad" height="48" width="48" class="w-full h-full object-cover" />
              </div>
            {:else}
              Mom
              <div class="w-16 h-16 rounded-full overflow-hidden">
                <img src={hayley} alt="Taken by Dad" height="48" width="48" class="w-full h-full object-cover" />
              </div>
            {/if}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>


<style>
  .view-wrapper {
    position: absolute;
    inset: 0;
    height: 100%;
    max-height: 100vh;
    width: 100%;
    max-width: calc(100% - var(--fluid-size-2));
    margin: auto;
  }
  
  .image-details {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding-left: var(--size-fluid-2);
  }
  .go-back {
    margin-bottom: 3vh;
  }
  .avatar {
    height: 48px;
    width: 48px;
    border-radius: 50%;
  }

  .image-view {
		flex: 1 1 0;
		height: 100%;
		margin: 0;
		& img {
			height: 100%;
			width: 100%;
			object-fit: contain;
			object-position: center;
		}
	}
</style>