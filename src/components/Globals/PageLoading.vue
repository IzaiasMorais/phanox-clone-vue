<template>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "PageLoading",
};
</script>

<style scoped>
.loading {
  max-width: max-content;
  margin: 30px auto;
}
.loading span {
  display: inline-block;
  width: 10px;
  margin-bottom: 20px;
  height: 10px;
  border-radius: 10px;
  background-color: #f02d34;
  margin: 4px;
  animation: dots 0.5s cubic-bezier(0.6, 0.1, 1, 0.4) infinite alternate;
}
.loading span:nth-child(1) {
  animation-delay: 0.1s;
}
.loading span:nth-child(2) {
  animation-delay: 0.15s;
}
.loading span:nth-child(3) {
  animation-delay: 0.2s;
}
.loading span:nth-child(4) {
  animation-delay: 0.25s;
}
@keyframes dots {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 30px, 0);
  }
}
</style>
