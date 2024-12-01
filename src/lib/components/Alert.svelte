<script lang="ts">
	import type { Business, Inspection } from '../../routes/restaurant/lookup/[id]/+server';

	/**
	 * Businesses have a risk_category, which is one of the following:
	 * I, II, III
	 * For now we only care about the highest risk level as they pose the most risk to the public
	 */
	export let riskLevel: Business['risk_category'];
	export let lastInspection: Inspection | undefined;

	/**
	 * We should display the alert as an error level if they have failed the last inspection and are risk level 3
	 * We should display the alert as a warning level if they have not had an inspection in the last 6 months and are risk level 3
	 */

	let error = false;
	let show = false;

	if (riskLevel?.includes('III') && lastInspection) {
		if (lastInspection.result === 'Unsatisfactory') {
			show = true;
			error = true;
		}

		if (new Date(lastInspection.date) < new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)) {
			console.log('should hit');
			show = true;
		}
	}
</script>

{#if show}
	{#if error}
		<div role="alert" class="alert alert-error">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
			<span>
				<span class="font-semibold">Caution:</span>
				This restaurant has failed their last inspection, and is a high risk restaurant.
				<a
					href="https://kingcounty.gov/en/dept/dph/health-safety/food-safety/inspection-rating-system/rating-system#:~:text=Category%20definitions"
					target="_blank"
					class="link"
				>
					Learn more
				</a>
			</span>
			<div>
				<button class="btn btn-sm" on:click={() => (show = false)}>Confirm</button>
			</div>
		</div>
	{:else}
		<div role="alert" class="alert alert-warning">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
			<span>
				<span class="font-semibold">Warning</span>: This restaurant has not received an inspection
				in the last 6 months and is a high risk restaurant.
				<a
					href="https://kingcounty.gov/en/dept/dph/health-safety/food-safety/inspection-rating-system/rating-system#:~:text=Category%20definitions"
					class="link"
					target="_blank"
				>
					Learn more
				</a>
			</span>
			<div>
				<button class="btn btn-sm" on:click={() => (show = false)}>Confirm</button>
			</div>
		</div>
	{/if}
{/if}
