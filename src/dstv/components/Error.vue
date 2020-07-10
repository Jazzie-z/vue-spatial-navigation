<template>
  <div class="error" v-if="error">
    <div class="title">Are you sure you want to exit?</div>
    <List
      :child="child"
      :items="items"
      :isFocused="true"
      id="error"
      v-on:onSelect="onSelect"
    />
  </div>
</template>

<script>
import List from "@/Focusable/List";
import ErrorButton from "@/dstv/components/Core/ErrorButton/ErrorButton";
import { mapState, mapActions } from "vuex";
import { enableNavigation, disableNavigation } from "@/Focusable/event";
export default {
  components: {
    List,
  },
  data() {
    return {
      child: [ErrorButton],
      isFocused: true,
      items: [
        { displayName: "Yes", action: true },
        { displayName: "No", action: false },
      ],
    };
  },
  computed: mapState({ error: (state) => state.error }),
  methods: {
    ...mapActions(["clearError", "retryError"]),
    onSelect({ action }) {
      if (action) {
        this.retryError();
      } else {
        this.clearError();
      }
    },
  },
  mounted() {
    enableNavigation({
      BACK: () => {
        this.clearError();
      },
      preCondition: () => this.isFocused,
      id: "error",
    });
  },
  destroyed() {
    disableNavigation("error");
  },
};
</script>

<style lang="scss" scoped>
.error {
  width: 1280px;
  height: 720px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 27;
  background-color: rgba(1, 1, 1, 0.8);
}
.title {
  font-size: 32px;
  margin-top: 216px;
  color: #f1f1f1;
  font-weight: 500;
  letter-spacing: 0;
  text-align: center;
}
.list {
  margin-top: 64px;
  justify-content: center;
}
</style>
