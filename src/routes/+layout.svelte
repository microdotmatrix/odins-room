<script>
	import '$styles/app.css';
	import '@fontsource/amatic-sc';
	import '@fontsource/quicksand';

	import { browser, dev } from '$app/environment';
	import { page, navigating } from '$app/stores';
	import { webVitals } from '$lib/vitals';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { ThemeSwitch } from '$components/theme';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import * as Icon from '$components/icons';

	import { enhance, applyAction } from '$app/forms';

		/** @type {import('./$types').LayoutData} */
	export let data

	/** @type {any} */
	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((/** @type {any} */ event, /** @type {{ expires_at: any; }} */ _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	});

	// @ts-ignore
	$: if (!dev && browser && data?.analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			// @ts-ignore
			analyticsId: data.analyticsId
		});
	}

  let loading = false;

  const handleSubmit = () => {
		loading = true;
		// @ts-ignore
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
		};
	};

	setupViewTransition();
</script>

<div class="app">
	<header class="mt-0 w-fit self-end lg:mr-4 lg:mt-6">
		{#if $navigating}
			<div class="absolute top-14 -left-10 z-50 w-fit h-fit">
				<span class="loading loading-ring loading-md"></span>
			</div>
		{/if}
		<nav>
			<ul>
				<li aria-current={$page.url.pathname === '/'}>
					<a href="/">Home</a>
				</li>
				<li aria-current={$page.url.pathname.includes('/albums')}>
					<a href="/albums">Albums</a>
				</li>
				<li aria-current={$page.url.pathname.includes('/about')}>
					<a href="/about">About</a>
				</li>
				{#if !session}
					<li aria-current={$page.url.pathname.includes('/login')}>
						<a href="/login" class="lg:tooltip uppercase font-bold" data-tip="Login">
							<Icon.Login class="login-icon" />
						</a>
					</li>
				{:else}
					<li>
						<form action="/logout" method="post" use:enhance={handleSubmit}>
							<button type="submit" disabled={loading} class="lg:tooltip uppercase font-bold" data-tip="Logout">
								<Icon.Logout class="login-icon" />
							</button>
						</form>
					</li>
				{/if}
			</ul>
		</nav>
		<ThemeSwitch />
	</header>
	
	<main>
		<slot />
	</main>

	<footer class="mt-12 text-neutral-content">
		<section class="footer container pt-8 pb-12 px-6">
			<aside class="space-y-3">
				<h3>Created Using:</h3>
				<span class="flex flex-row items-center gap-4">
					<a href="https://kit.svelte.dev" target="_blank">
						<Icon.SvelteKit />
					</a> 
					<span class="text-xl font-bold">+</span> 
					<a href="https://photos.google.com" target="_blank">
						<Icon.GooglePhotos />
					</a>
				</span>
				<p class="text-center">&copy;2023 John Polinski</p>
			</aside> 
			<nav class="justify-self-center lg:justify-self-end">
				<div class="grid grid-flow-col gap-4">
					<a href="https://github.com/microdotmatrix/odins-room" target="_blank">
						<Icon.Github />
					</a> 
					<a href="https://codepen.io/mrselfdestruct" target="_blank">
						<Icon.Codepen />
					</a>
					<a href="https://facebook.com/john.polinski.5811" target="_blank">
						<Icon.Facebook />
					</a> 
					<a href="https://isomorphicdesign.com" target="_blank">
						<Icon.WebApp />
					</a>
				</div>
			</nav>
		</section>
	</footer>
</div>

<style>
	:root {
		view-transition-name: none;
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	header {
		position: sticky;
		top: 0;
		z-index: 40;
		padding: 1rem 1.5rem;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		& .login-icon {
			font-size: var(--font-size-fluid-3);
			margin-top: 4px;
		}
	}

	nav > ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		& li {
			position: relative;
			display: inline-flex;
			align-items: center;
			z-index: 1;
			text-align: center;
			padding: var(--size-fluid-1) 2vw;
			@media (min-width: 768px) {
				padding: var(--size-fluid-1) var(--size-fluid-3);
			}
			& a[href] {
				position: relative;
				z-index: 10;
				text-decoration: none;
				font-family: var(--font-amatic-sc);
				font-size: clamp(1.75rem, 4vw, 2.5rem);
				font-weight: 600;
				letter-spacing: 0.25rem;
				text-transform: uppercase;
				transition: color 200ms ease;
				&::after {
					content: "";
					width: 4px;
					height: 4px;
					border-radius: 50%;
					background: currentColor;
					position: absolute;
					right: -1.25vw;
					top: 45%;
					@media (min-width: 1024px) {
						width: 8px;
						height: 8px;
					}
				}
			}
			&[aria-current='true'] {
				color: var(--accent);
				&::after {
					position: absolute;
					z-index: -1;
					content: '';
					left: 1rem;
					top: 0rem;
					width: var(--size-fluid-5);
					height: var(--size-fluid-5);
					opacity: 1;
					background: var(--gradient-17);
					border-radius: 50%;
					opacity: 0.35;
					transition: opacity 400ms ease-in, box-shadow 500ms ease;
					view-transition-name: active-page;
					@media (min-width: 1024px) {
						top: 0.75rem;
						left: 0.5rem;
						width: var(--size-fluid-5);
						height: var(--size-fluid-5);
					}
				}
				&:hover::after {
					opacity: 0.7;
					@apply shadow-lg shadow-gray-900/50;
				}
			}
		}
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		background: var(--gradient-16);
		background-attachment: fixed;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
