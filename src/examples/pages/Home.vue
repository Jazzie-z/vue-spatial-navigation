<template>
	<div class="home">
		<img
			class="background"
			src="https://hope1032.com.au/wp-content/uploads/2016/06/2016-07-07_mebeforeyou-hero.jpg"
		/>
		<div class="carousel">
			<Carousel :isFocused="isFocused" />
		</div>
	</div>
</template>

<script>
import Carousel from "@/examples/collections/HomeCarousel";
import {
	enableNavigation,
	disableNavigation,
	dispatchFocus,
	registerFocusDispatcher,
	unRegisterFocusDispatcher
} from "@/event-bus";
export default {
	components: {
		Carousel
	},
	data() {
		return {
			isFocused: false
		};
	},
	methods: {
		keyListener({ component, accepted }) {
			if (component === "MAIN_COMPONENT") {
				if (!accepted) {
					dispatchFocus({
						component: "MAIN_COMPONENT",
						accepted: true
					});
				} else {
					this.isFocused = true;
				}
			}
        },
        setFocusToMenu() {
            dispatchFocus({ component: 'MENU' });
            this.isFocused = false;
        },
	},
	mounted() {
		if (this.isMenuLoaded && !this.data.length) this.getHomeData();
		registerFocusDispatcher(this.keyListener);
		enableNavigation({
			UP: () => {
				this.setFocusToMenu();
			},
			BACK: () => this.setFocusToMenu(),
			preCondition: () => this.isFocused,
			id: "home"
		});
	}
};
</script>

<style scoped>
.background {
	width: 1000px;
	position: absolute;
	height: 400px;
	top: -40px;
	left: -10px;
	z-index: 0;
}
.carousel {
	margin-top: 360px;
}
</style>
