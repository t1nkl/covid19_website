<script setup lang="ts">
import ErrorPoints from '@/components/animations/ErrorPoints.vue'
</script>

<template>
  <div class="error-page">
    <ErrorPoints />

    <div class="error-page__content">
      <h1>404</h1>
      <p>Page not found... <a href="/">home?</a></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;

  .error-page__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: -11rem;

    a {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
