<template>
  <div class="as-button" @click="$emit('click')">
    this is a test component
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AsButton extends Vue {

}
</script>
