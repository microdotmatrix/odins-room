<script>
	import { getRandomInt } from '$utils/helpers';
	import { Login } from '$components/forms';
	import * as Icon from '$components/icons';

	export let data;
	export let form;

	$: ({ albums } = data.albums);
	let idx = getRandomInt(1, 8);

	$: album = albums[idx];
</script>

<svelte:head>
	<title>Odin's Room</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container px-6">
	<div class="py-6 sm:py-8 lg:py-12">
		<div class="mx-auto max-w-screen-xl">
			<div
				class="flex flex-col overflow-hidden rounded-lg bg-neutral-content/75 dark:bg-neutral/75 sm:flex-row md:h-[70vh]"
			>
				<div class="order-first h-80 w-full bg-gray-300 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/3">
					<img
						src={album.coverPhoto}
						alt={album.title}
						loading="eager"
						class="h-full w-full object-cover object-center"
					/>
				</div>
				<div class="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
					<h1 class="mb-4 tracking-wider">Odin's Room</h1>

					<p class="text-lg tracking-wide text-base-content">
						Welcome to Odin's Room. I'm <span class="font-bold">John</span>, aka "Dad". This website is a special project I made in order to share photos of my son, <span class="font-bold">Odin</span>, with friends and family.
					</p>

					<div class="my-auto space-y-8">
						{#if !data.session}
							<Login {form} />
						{:else}
							<p class="text-xl">Welcome back, <span class="font-bold">{data.session.user.email}</span></p>
							<button formaction="/logout" class="btn btn-info w-fit">
								Logout <Icon.Logout class="w-5 h-5" />
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	h1 {
		font-size: var(--size-fluid-4);
	}
</style>
