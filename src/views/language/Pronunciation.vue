<template>
  <div class="pronunciation">
    <div class="mode-select">
      <div class="mode-label">MODE：</div>
      <div class="mode-btn" @click="modeSwitch">{{ modeName }}</div>
      <div v-if="mode == 3" class="mode-btn" @click="drawModeSwitch">
        {{ drawModeName }}
      </div>
    </div>
    <div v-if="mode != 3" class="map-container">
      <div class="header">
        <div class="col"></div>
        <div class="col">あ段</div>
        <div class="col">い段</div>
        <div class="col">う段</div>
        <div class="col">え段</div>
        <div class="col">お段</div>
        <div class="clear"></div>
      </div>
      <div class="content">
        <div class="row" v-for="(item, i) in map" :key="item">
          <div class="col row-header">{{ item[0].hiragana }}-行</div>
          <div
            class="col flipable"
            v-for="(item, j) in item"
            :key="item"
            @click="flip(i, j)"
          >
            {{ item.current }}
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div v-if="mode == 3" class="card-container">
      <div class="card-body">
        <div @click="cardFlip($event)" @contextmenu="seek" class="card">
          {{ card.current }}
        </div>
        <div id="anotherOne" class="card anotherOne">{{ anotherOne }}</div>
        <div id="anotherTwo" class="card anotherTwo">{{ anotherTwo }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { map, Pronunciation } from "./map";
import { throttle } from "@/utils/util";

export default defineComponent({
  data() {
    return {
      map,
      mode: 0,
      modeNames: ["平假名模式", "片假名模式", "混合模式", "抽卡模式"],
      drwaModeNames: ["只抽平假名", "只抽片假名", "只抽罗马音", "混合"],
      drawMode: 0,
      card: {} as Pronunciation,
      //卡片背后内容
      anotherOne: "",
      anotherTwo: "",
    };
  },
  methods: {
    flip(i: number, j: number) {
      switch (this.mode) {
        case 0:
          if (this.map[i][j].current == this.map[i][j].hiragana) {
            this.map[i][j].current = this.map[i][j].rome;
          } else {
            this.map[i][j].current = this.map[i][j].hiragana;
          }
          break;
        case 1:
          if (this.map[i][j].current == this.map[i][j].katakana) {
            this.map[i][j].current = this.map[i][j].rome;
          } else {
            this.map[i][j].current = this.map[i][j].katakana;
          }
          break;
        case 2:
          if (this.map[i][j].current == this.map[i][j].hiragana) {
            this.map[i][j].current = this.map[i][j].katakana;
          } else if (this.map[i][j].current == this.map[i][j].katakana) {
            this.map[i][j].current = this.map[i][j].rome;
          } else {
            this.map[i][j].current = this.map[i][j].hiragana;
          }
      }
    },
    modeSwitch() {
      if (this.mode == 0) {
        this.mode = 1;
        this.switchToKatakana();
      } else if (this.mode == 1) {
        this.mode = 2;
        this.switchToHiraganaOrMix();
      } else if (this.mode == 2) {
        this.mode = 3;
        this.drawCard();
      } else {
        this.mode = 0;
        this.switchToHiraganaOrMix();
      }
    },
    drawModeSwitch() {
      if (this.drawMode >= 3) {
        this.drawMode = 0;
      } else {
        this.drawMode++;
      }
      this.drawCard();
    },
    switchToHiraganaOrMix() {
      this.map = this.map.map((item) => {
        return item.map((item) => {
          item.current = item.hiragana;
          return item;
        });
      });
    },
    switchToKatakana() {
      this.map = this.map.map((item) => {
        return item.map((item) => {
          item.current = item.katakana;
          return item;
        });
      });
    },
    drawCard() {
      const field: Array<string> = ["hiragana", "katakana", "rome"];
      const row = Math.round(Math.random() * 9);
      const col = Math.round(Math.random() * 4);
      const factor = Math.round(Math.random() * 2);
      this.card = this.map[row][col];
      switch (this.drawMode) {
        case 0:
          this.card.current = this.card.hiragana;
          break;
        case 1:
          this.card.current = this.card.katakana;
          break;
        case 2:
          this.card.current = this.card.rome;
          break;
        case 3:
          this.card.current = this.card[field[factor]];
          break;
        default:
      }
    },
    cardFlip(el: MouseEvent) {
      const element = el.currentTarget as HTMLElement;
      element.style.animation = "flip 1s 100ms";
      setTimeout(() => {
        this.drawCard();
      }, 500);
      element.addEventListener(
        "animationend",
        () => {
          element.style.animation = "";
        },
        {
          once: true,
        }
      );
      element.onanimationiteration;
    },
    seek(e: MouseEvent) {
      e.preventDefault();
      this.nextEl();
      const el = document.querySelector("#anotherOne") as HTMLElement;
      const el2 = document.querySelector("#anotherTwo") as HTMLElement;
      el.style.display = "block";
      el2.style.display = "block";

      el.style.animation = "trans 1.5s 100ms";
      el2.style.animation = "transright 1.5s 100ms";

      el.addEventListener(
        "animationend",
        () => {
          el.style.display = "none";
          el.style.animation = "";
        },
        { once: true }
      );
      el2.addEventListener(
        "animationend",
        () => {
          el2.style.display = "none";
          el2.style.animation = "";
        },
        { once: true }
      );
    },
    nextEl() {
      throttle(() => {
        if (this.card.current == this.card.hiragana) {
          this.anotherOne = this.card.katakana;
          this.anotherTwo = this.card.rome;
        } else if (this.card.current == this.card.katakana) {
          this.anotherOne = this.card.hiragana;
          this.anotherTwo = this.card.rome;
        } else {
          this.anotherOne = this.card.hiragana;
          this.anotherTwo = this.card.katakana;
        }
      }, 1500);
    },
  },
  computed: {
    modeName(): string {
      return this.modeNames[this.mode];
    },
    drawModeName(): string {
      return this.drwaModeNames[this.drawMode];
    },
  },
});
</script>
<style scoped>
.pronunciation {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 50px;
}
.mode-select {
  height: 35px;
}
.mode-label {
  display: inline-block;
  height: 35px;
  line-height: 35px;
  font-size: 20px;
  font-weight: bold;
  vertical-align: middle;
}
.mode-btn {
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  margin-left: 15px;
  text-align: center;
  background-color: #67aff6;
  vertical-align: middle;
  border-radius: 3px;
  color: rgb(245, 239, 239);
  user-select: none;
  cursor: pointer;
}
.map-container {
  margin-top: 15px;
}
.col {
  width: 16.6%;
  height: 35px;
  line-height: 35px;
  float: left;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}
.flipable:hover {
  background-color: rgb(236, 236, 236);
}
.header,
.row-header {
  background-color: rgb(218, 220, 231);
}
.card-container {
  margin-top: 50px;
}
.card-body {
  position: relative;
  margin: auto;
  width: 200px;
  height: 320px;
}
.card {
  background-color: rgb(221, 221, 221);
  line-height: 320px;
  font-size: 60px;
  font-weight: bold;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
}
.anotherOne {
  display: none;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -1;
  /* animation: trans 1s 100ms; */
}
.anotherTwo {
  display: none;
  width: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: -1;
  /* animation: transright 1s 100ms; */
}
</style>
<style>
@keyframes flip {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
@keyframes trans {
  0% {
    left: 0px;
  }
  50% {
    left: 250px;
  }
  100% {
    left: 0px;
  }
}
@keyframes transright {
  0% {
    right: 0px;
  }
  50% {
    right: 250px;
  }
  100% {
    right: 0px;
  }
}
</style>