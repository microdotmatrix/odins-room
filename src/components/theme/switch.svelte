<script>
	import { theme } from './store';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import * as Icon from '$components/icons';

	export let label = 'Dark mode';

	const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	function toggle() {
		const upcoming_theme = $theme.current === 'light' ? 'dark' : 'light';

		if (
			upcoming_theme ===
			(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
		) {
			// Switch the preference to `system`
			$theme.preference = 'system';
		} else {
			// Switch the preference to `light` or `dark`
			$theme.preference = upcoming_theme;
		}

		$theme.current = upcoming_theme;
	}

	/** @param {MediaQueryListEvent} e */
	const cb = (e) =>
		theme.set({ preference: $theme.preference, current: e.matches ? 'dark' : 'light' });

	/** @type {MediaQueryList} */
	let query;

	$: {
		if (!browser) break $;

		query?.removeEventListener('change', cb);

		if ($theme.preference === 'system') {
			query = window.matchMedia('(prefers-color-scheme: dark)');
			query.addEventListener('change', cb);
		}
	}

	onDestroy(() => query?.removeEventListener('change', cb));
</script>

<button
	on:click={toggle}
	type="button"
	aria-pressed={$theme.current === 'dark' ? 'true' : 'false'}
	aria-label={label}
	class="swap swap-rotate btn btn-sm lg:btn-md py-5 px-2 lg:py-1 lg:px-2 group"
>
	<input type="checkbox" />
		{#if browser}
			{#if $theme.current === 'light'}
				<span 
					class="lg:tooltip lg:tooltip-bottom" 
					style:--tooltip-offset="calc(100% + 8px + var(--tooltip-tail, 0px))" 
					style:--tooltip-tail-offset="calc(100% + 8px - var(--tooltip-tail))"
					data-tip="Dark Mode" 
					in:receive={{ key: Math.random() }} 
					out:send={{ key: Math.random() }}
				>
					<Icon.Day class="w-6 h-6 lg:w-8 lg:h-8 group-hover:text-accent transition-colors duration-500" />
				</span>
			{:else}
				<span 
					class="lg:tooltip lg:tooltip-bottom" 
					style:--tooltip-offset="calc(100% + 8px + var(--tooltip-tail, 0px))" 
					style:--tooltip-tail-offset="calc(100% + 8px - var(--tooltip-tail))"
					data-tip="Light Mode" 
					in:receive={{ key: Math.random() }} 
					out:send={{ key: Math.random() }}
				>
					<Icon.Night class="w-6 h-6 lg:w-8 lg:h-8 group-hover:text-accent transition-colors duration-500" />
				</span>
			{/if}
		{/if}
</button>
