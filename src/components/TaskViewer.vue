<template>
  <div ref="item" class="position-absolute closed">
    <a-collapse style="" class="" expand-icon-position="end">
      <a-collapse-item @click="changeState" :show-expand-icon="false" class="p-0 shadow" key="1">
        <template #header>
          <div class="px-3">
            <icon-message class="fw-bolder fs-4"/>
          </div>
        </template>
      </a-collapse-item>
    </a-collapse>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "TaskViewer",
  props: ['datas'],
  setup() {
    const item = ref()

    return {item}
  },
  methods: {
    changeState() {
      if (this.item.classList.contains("opened")) {
        this.item.classList.replace("opened", "closed")
      } else {
        this.item.classList.replace("closed", "opened")
      }
    }
  }
}
</script>

<style scoped lang="scss">
.closed {
  right: 5px;
  bottom: 30px;
}

.opened {

  transition: all ease-in;
  right: 5px;
  top: 50px;
  bottom: 30px;
  left: 50%;

  & div {
    height: 100%;
    background-color: #ffffff;
  }
}
</style>