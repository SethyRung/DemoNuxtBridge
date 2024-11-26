<template>
  <div>
    <slot></slot>
    <UNotifications :ui="{ position: 'top-0 bottom-[unset]' }" />
  </div>
</template>

<script lang="ts" setup></script>
