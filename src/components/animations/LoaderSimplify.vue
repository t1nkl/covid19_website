<script setup lang="ts"></script>

<template>
  <div class="loader-simplify">
    Loading<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span>
  </div>
</template>

<style lang="scss" scoped>
.loader-simplify {
  max-width: 350px;
  margin: 10rem auto;
  padding: 2rem;
  font-weight: normal;

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
}
</style>
