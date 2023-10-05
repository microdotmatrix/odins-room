<script>
	import { browser, dev } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/vitals';
	import '$styles/app.css';

	import '@fontsource/amatic-sc';
	import { ThemeSwitch } from '$components/theme';

	import { onNavigate } from '$app/navigation';
	import { setupViewTransition } from 'sveltekit-view-transition';


	/** @type {import('./$types').LayoutServerData} */
	export let data;

	$: if (!dev && browser && data?.analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId: data.analyticsId
		});
	}

	const { transition } = setupViewTransition();
</script>

<div class="app">
	<header>
		<nav>
			<ul>
				<li aria-current={$page.url.pathname === '/'}>
					<a href="/"> Home </a>
				</li>
				<li aria-current={$page.url.pathname.includes('/albums')}>
					<a href="/albums">Albums</a>
				</li>
			</ul>
		</nav>
		<ThemeSwitch />
	</header>
	
	<main use:transition={'content'}>
		<slot />
	</main>

	<footer>
		<p>Currently viewing: {data.pathname}</p>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
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
		margin-top: 1.5rem;
		padding: 1rem 1.5rem;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	nav > ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
	}

	nav > ul > li {
		position: relative;
		display: inline-flex;
		align-items: center;
		z-index: 1;
		text-align: center;
		padding: var(--size-fluid-1) var(--size-fluid-2);
		& a[href] {
			text-decoration: none;
			font-size: 1.5rem;
			font-weight: 600;
			letter-spacing: 0.25rem;
			text-transform: uppercase;
			transition: color 200ms ease;
		}
	}

	nav > ul > li[aria-current='true'] {
		color: var(--accent);
	}

	nav > ul > li[aria-current='true']::after {
		position: absolute;
		z-index: -1;
		content: '';
		left: 0.15rem;
		top: 0.35rem;
		width: 3rem;
		height: 3rem;
		opacity: 1;
		background-color: var(--brand);
		border-radius: 50%;
		transition: transform 100ms ease-in;
		view-transition-name: active-page;
		@media (min-width: 768px) {
			top: 0.25rem;
			left: 0.5rem;
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
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
