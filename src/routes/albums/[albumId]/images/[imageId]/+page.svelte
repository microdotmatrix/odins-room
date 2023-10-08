<script>
  import { page } from '$app/stores';
  import { formatDate } from '$utils/helpers';
	import * as Icon from '$components/icons';
  import { fade, fly } from 'svelte/transition';
  import john from '$lib/images/john.jpg';
  import hayley from '$lib/images/hayley.jpg';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import LeftArrow from '$components/icons/left-arrow.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  
  $: imageId = data.imageId
  $: ({ images } = data.images);
  $: image = images.find((/** @type {{ id: string | undefined; }} */ image) => image.id === imageId);

  const { transition } = setupViewTransition();
</script>

<div class="container">
  <div class="view-wrapper flex flex-col lg:flex-row bg-base-100">
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

    <div class="image-details lg:justify-center">
      <button 
        class="btn w-fit go-back px-1 absolute -mt-20 ml-0 lg:-mt-52 lg:-ml-12" 
        on:click={() => history.back()}
        in:fly={{ x: 100, delay: 500, duration: 300 }}
      >
        <Icon.LeftArrow class="w-10 h-10" />
        <span class="sr-only">Back to Album</span>
      </button>
      <div class="pr-3 md:pr-6" in:fade={{ duration: 400 }} out:fade={{ duration: 100 }}>
        <h1
          in:fly={{ x: 100, delay: 800, duration: 500 }} 
          out:fade
          class="date"
        >
          {formatDate(image.createdAt)}
        </h1>
        <div class="flex flex-row items-center gap-5 credit" in:fly={{ y: 20, delay: 1200, duration: 300 }}>
          <span>Taken by:</span>
          <span class="flex flex-row items-center gap-2" in:fade={{ delay: 1800 }}>
            {#if image?.camera === "Apple"}
              <span class="font-bold">Dad</span>
              <div class="w-20 h-20 rounded-full overflow-hidden border-[8px] border-neutral-content/25 dark:border-neutral-focus/25 shadow-lg shadow-neutral-focus/50 dark:shadow-base-300">
                <img src={john} alt="Taken by Dad" height="48" width="48" class="w-full h-full object-cover" />
              </div>
            {:else}
              <span class="font-bold">Mom</span>
              <div class="w-20 h-20 rounded-full overflow-hidden border-[8px] border-neutral-content/25 dark:border-neutral-focus/25 shadow-lg shadow-neutral-focus/50 dark:shadow-base-300">
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
    height: 100%;
    padding-left: var(--size-fluid-2);
    padding-top: var(--size-fluid-2);
    @media (min-width: 1024px) {
      padding-top: 0;
    }
  }
  .go-back {
    margin-bottom: 3vh;
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
  .date {
    font-size: var(--size-fluid-5);
  }
  .credit {
    font-size: var(--size-fluid-3);
    @media (min-width: 1024px) {
      font-size: var(--size-fluid-2);
    }
  }
</style>