<script setup lang="ts"></script>

<template>
  <div class="loader-simplify">
    <span style="--i: 1">L</span>
    <span style="--i: 2">o</span>
    <span style="--i: 3">a</span>
    <span style="--i: 4">d</span>
    <span style="--i: 5">i</span>
    <span style="--i: 6">n</span>
    <span style="--i: 7">g</span>
    <span class="dot-1">.</span>
    <span class="dot-2">.</span>
    <span class="dot-3">.</span>
  </div>
</template>

<style lang="scss" scoped>
.loader-simplify {
  max-width: 350px;
  margin: 10rem auto;
  padding: 2rem;
  font-weight: normal;

  span {
    position: relative;
    display: inline-block;
    animation: flip 3s infinite;
    animation-delay: calc(0.3s * var(--i));
  }
  @keyframes flip {
    0%,
    80% {
      transform: rotateY(360deg);
    }
  }

  .dot-1 {
    animation: blink 1s infinite;
    animation-delay: 1s;
  }
  .dot-2 {
    animation: blink 2s infinite;
    animation-delay: 2s;
  }
  .dot-3 {
    animation: blink 4s infinite;
    animation-delay: 4s;
  }
  @keyframes blink {
    0% {
      opacity: 0.2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
}
</style>
