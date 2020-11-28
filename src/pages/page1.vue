<template>
  <div>{{ testText }}</div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Partner'
})
export default class extends Vue {
  private testText: string = 'hello partner'
}
</script>

<style lang="scss" scoped>

</style>
