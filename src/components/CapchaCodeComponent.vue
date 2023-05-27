<template>
  <canvas id="canvas" :height="this.height? this.height:30" :width="this.width? this.width:100"></canvas>
</template>

<script>

export default {
  name: "CapchaCodeComponent",
  data() {
    return {
      hexColor: "0123456789ABCDEF"
    }
  }, props: ["height", 'width', 'captcha'],
  updated() {
    this.getCode(this.captcha)
  },
  mounted() {
    this.getCode(this.captcha)
  },
  methods: {

    getCode(captcha) {
      const canvas = document.getElementById("canvas");

      const context = canvas.getContext("2d");
      // context.fillStyle = "#ffef62";
      context.fillRect(0, 0, this.width ? this.width : 100, this.height ? this.height : 30);

      // # Set text styles
      context.font = "bold 18px Arial";
      context.textAlign = "center";
      context.fontStyle = "italic"
      context.shadowBlur = 10

// Set text color
      context.fillStyle = this.colorGenerator();

// Write "KindaCode.com"
      context.strokeText(captcha, this.width ? this.width / 2 : 100 / 2, this.height ? this.height / 2 : 44 / 2);
      context.fillText(captcha, this.width ? this.width / 2 : 100 / 2, this.height ? this.height / 2 : 44 / 2);
    },
    colorGenerator() {
      let index = null;
      let color = "#";
      for (let i = 0; i < 6; i++) {
        index = Math.floor(Math.random() * (this.hexColor.length - 1));
        color += this.hexColor.charAt(index);
      }
      return color;
    }
  }
}
</script>

<style scoped>

</style>