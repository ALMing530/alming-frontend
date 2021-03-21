<template>
  <div ref="clock" class="clock">
    <canvas id="canvas" width="120" height="120"></canvas>
    <p>{{ time.toLocaleString() }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent,ref } from "vue";
export default defineComponent({
  setup(){
    const time = ref(new Date());
    setInterval(() => {
      time.value = new Date();
    }, 1000);
    return {
      time,
    };
  },
  data() {
    return {
      canvas: {} as HTMLCanvasElement,
      ctx: {} as CanvasRenderingContext2D,
      imgSrc: require("../assets/icon.png"),
    };
  },
  methods: {
    drawScene(img: HTMLImageElement) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.save();
      this.ctx.drawImage(img, 20, 20, 80, 80);
      this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      //number
      this.ctx.fillStyle = "#000";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.beginPath();
      for (let n = 1; n <= 12; n++) {
        const theta = ((n - 3) * Math.PI) / 6;
        const x = 60 * 0.9 * Math.cos(theta);
        const y = 60 * 0.9 * Math.sin(theta);
        this.ctx.fillText(n.toString(), x, y);
      }

      //get now
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      hours = hours > 12 ? hours - 12 : hours;
      const hour = hours + minutes / 60;
      const minute = minutes + seconds / 60;
      //hour
      this.ctx.save();
      const thetah = ((hour - 3) * Math.PI) / 6;
      this.ctx.rotate(thetah);
      this.ctx.beginPath();
      this.ctx.moveTo(-6, -4);
      this.ctx.lineTo(-6, 4);
      this.ctx.lineTo(60 * 0.5, 1);
      this.ctx.lineTo(60 * 0.5, -1);
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      this.ctx.fill();
      this.ctx.restore();

      //minute
      this.ctx.save();
      const thetam = ((minute - 15) * Math.PI) / 30;
      this.ctx.rotate(thetam);
      this.ctx.beginPath();
      this.ctx.moveTo(-6, -3);
      this.ctx.lineTo(-6, 3);
      this.ctx.lineTo(60 * 0.7, 1);
      this.ctx.lineTo(60 * 0.7, -1);
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      this.ctx.fill();
      this.ctx.restore();
      //second
      this.ctx.save();
      const thetas = ((seconds - 15) * Math.PI) / 30;
      this.ctx.rotate(thetas);
      this.ctx.beginPath();
      this.ctx.moveTo(-6, -2);
      this.ctx.lineTo(-6, 2);
      this.ctx.lineTo(60 * 0.9, 1);
      this.ctx.lineTo(60 * 0.9, -1);
      this.ctx.fillStyle = "rgba(12,138,68,0.6)";
      this.ctx.fill();
      this.ctx.restore();

      //center point
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = "rgb(241, 190, 186)";
      this.ctx.fill();

      this.ctx.restore();
    },
    loadCanvasResource() {
      const img = new Image();
      img.src = this.imgSrc;
      img.onload = () => {
        this.drawScene(img);
        setInterval(() => {
          this.drawScene(img);
        }, 1000);
      };
    },
  },
  mounted() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.loadCanvasResource();    
  },
});
</script>
<style scoped>
.clock{
  position: fixed;
  right: 8%;
  top: 35%;
}
</style>