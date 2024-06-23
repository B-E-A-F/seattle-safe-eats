<script>
	import '../app.css';
</script>

<div class="flex flex-col h-screen w-screen overflow-x-hidden">
	<div class="flex flex-grow">
		<slot />
	</div>
	<footer class="footer footer-center p-4 text-base-content border-t-2 border-t-base-200">
		<aside class="flex">
			<a href="https://www.telperion.io/" target="_blank"> Telperion Technologies LLC </a>
			|
			<a
				href="https://data.kingcounty.gov/Health-Wellness/Food-Establishment-Inspection-Data/f29f-zza5/about_data"
				target="_blank"
			>
				Data Source
			</a>
		</aside>
	</footer>
</div>
