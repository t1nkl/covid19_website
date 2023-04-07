<script setup lang="ts">
import { ref } from 'vue'

function generateDivs(): string[] {
  const divs: string[] = []

  for (let i = 0; i < 300; i++) {
    divs.push(`<div class="c"></div>`)
  }

  return divs
}

const divs = ref(generateDivs())
</script>

<template>
  <div class="error-points">
    <div class="wrap">
      <div v-for="(div, index) in divs" :key="index" class="c"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';

$error-page-total: 300;
$base-point: 0;

.error-points {
  // best in chrome
  $total: $error-page-total;
  $orb-size: 100px;
  $particle-size: 2px;
  $time: 14s;

  max-width: 500px;
  margin: 20rem auto;
  padding: 2rem;

  .wrap {
    position: relative;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    transform-style: preserve-3d;
    perspective: 1000px;
    animation: rotate $time infinite linear; // rotate orb
  }

  @keyframes rotate {
    100% {
      transform: rotateY(360deg) rotateX(360deg);
    }
  }

  .c {
    position: absolute;
    width: $particle-size;
    height: $particle-size;
    border-radius: 50%;
    opacity: 0;
  }

  @for $i from 1 through $total {
    $z: (math.random(360) * 1deg); // random angle to rotateZ
    $y: (math.random(360) * 1deg); // random to rotateX
    $point: ((math.div(40, $error-page-total)) * $i) + $base-point; // set point

    .c:nth-child(#{$i}) {
      // grab the nth particle
      animation: orbit#{$i} $time infinite;
      animation-delay: ($i * 0.01s);
      background-color: hsla($point, 100%, 50%, 1);
    }

    @keyframes orbit#{$i} {
      20% {
        opacity: 1; // fade in
      }
      30% {
        transform: rotateZ(-$z) rotateY($y) translateX($orb-size) rotateZ($z); // form orb
      }
      80% {
        transform: rotateZ(-$z) rotateY($y) translateX($orb-size) rotateZ($z); // hold orb state 30-80
        opacity: 1; // hold opacity 20-80
      }
      100% {
        transform: rotateZ(-$z) rotateY($y) translateX(($orb-size * 3)) rotateZ($z); // translateX * 3
      }
    }
  }
}
</style>
