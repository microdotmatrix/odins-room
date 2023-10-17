// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		interface ViewTransition {
			updateCallbackDone: Promise<void>;
			ready: Promise<void>;
			finished: Promise<void>;
			skipTransition: () => void;
		}
		
		interface Document {
			startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
		}
		
		interface CSSStyleDeclaration {
			viewTransitionName: string;
		}
	}
}


export {};
