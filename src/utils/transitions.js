import { onNavigate } from '$app/navigation';

/**
 * Function for activating the View Transitions API in SvelteKit
 * using the onNavigate function for asyncronous navigation events.
 */
export const preparePageTransition = () => {
	onNavigate(async (navigation) => {
		// @ts-ignore
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((oldStateCaptureResolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				oldStateCaptureResolve();
				await navigation.complete;
			});
		});
	});
};