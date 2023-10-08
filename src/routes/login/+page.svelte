<script>
  import { Login } from '$components/forms';

  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<div class="container flex flex-col lg:flex-row justify-evenly items-center gap-8">
	<section class="login">
  	<Login {form} />
	</section>
</div>