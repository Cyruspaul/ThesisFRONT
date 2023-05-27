<template>
  <section>
    FileManagement
    <p v-text="this.posts"></p>
  </section>
</template>

<script>
import {ref} from "vue";

export default {
  name: "FileManagement",
  data() {
    return {
      posts: ref({})
    }
  },
  async mounted() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1') //https://api.adviceslip.com/advice
        .then(response => response.json())
        .then(json => json)
    this.posts.value = await res
    // return {
    //   posts
    // }
  }
}
</script>

<style scoped>

</style>