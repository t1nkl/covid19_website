<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbsItems = () => {
  const homeItem = {
    title: 'Home',
    disabled: route.path === '/',
    href: '/'
  }
  if (route.path === '/') {
    return [homeItem]
  }

  const detailsItem = {
    title: 'Details',
    disabled: route.path === '/details',
    href: '/details'
  }
  if (route.path === '/details') {
    return [homeItem, detailsItem]
  }

  if (route.params?.country_name) {
    const countryItem = {
      title: (route.params.country_name as string).toUpperCase(),
      disabled: true,
      href: (route.params.country_name as string).toLowerCase()
    }
    return [homeItem, detailsItem, countryItem]
  }
}
</script>

<template>
  <div class="breadcrumbs">
    <ul class="v-breadcrumbs v-breadcrumbs--density-default">
      <li v-for="(item, index) in breadcrumbsItems()" :key="index">
        <RouterLink
          class="v-breadcrumbs-item v-breadcrumbs-item--link"
          :class="{ disabled: item.disabled }"
          :to="item.href"
          >{{ item.title }}</RouterLink
        >
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  ul.v-breadcrumbs {
    //padding: 10px 16px;
    list-style: none;
  }

  ul.v-breadcrumbs li {
    display: inline;
    //font-size: 18px;
  }

  ul.v-breadcrumbs li + li:before {
    padding: 8px;
    color: inherit;
    content: '/\00a0';
  }

  ul.v-breadcrumbs li a.disabled {
    opacity: var(--v-disabled-opacity);
    pointer-events: none;
  }
}
</style>
