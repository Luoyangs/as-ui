<template>
  <as-testbat>

  </as-testbat>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Testbat } from 'as-ui';

@Component({
  components: {
    AsTestbat: Testbat
  }
})
export default class TestTestbat extends Vue {

}
</script>
