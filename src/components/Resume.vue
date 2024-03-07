<script setup>
</script>

<template>
  <div class="resume">
    <div class="resume-avatar">
      <img src='../assets/avatar-transparent.png' alt="avatar" :width="60" />
    </div>

    <div>
      <a href='https://github.com/enoughtallisymcrift' target='_blank' rel='noreferrer'>
        github
      </a>
    </div>
  </div>
</template>

<style scoped lang="less">
.resume {
  font-size: calc(0.5rem + 1vw);
  width: 60px;
  margin: 1rem auto;
  text-align: center;

  &-avatar {
    margin-bottom: 1rem;
  }
}
</style>