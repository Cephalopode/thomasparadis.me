<template>
  <div class="modal" :class="active ? 'is-active' : ''">
    <div class="modal-background"></div>
    <div class="modal-content box">
      <div v-if="$route.query.success == 'true'" class="success">
        <h1 class="title"><fa-icon :icon="['fas', 'check-circle']" />Message successfully sent!</h1>
        <div class="content">
          <p>Thank you! I will reach back to you as soon as possible</p>
        </div>
      </div>
      <div v-else class="error">
        <h1 class="title"><fa-icon :icon="['fas', 'times-circle']" />Uh oh... Message could not be sent</h1>
        <div class="content">
          <p>{{ $route.query.message }}</p>
          <p style="color:red">{{ $route.query.error }}</p>
        </div>
      </div>
      <div class="container">
        <div class="button is-primary" @click="close()">Ok</div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close()"></button>
  </div>
</template>

<script>
export default {
  title: 'email-modal',
  watch: {
    '$route.query': {
      handler(val) {
        if (val.success) {
          this.active = true
        } else {
          this.active = false
        }
      },
      immediate: true,
      deep: false,
    },
  },
  state: {
    query: Object,
    active: Boolean,
  },
  methods: {
    close() {
      this.$router.push({ query: {} })
    },
  },
}
</script>
