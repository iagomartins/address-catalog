<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const lang = ref(false)
const { t } = useI18n()
</script>

<template>
  <header class="full-width">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="full-width" style="position: relative;">
      <nav>
        <RouterLink to="/">{{ t('home') }}</RouterLink>
        <div class="language-toggle">
          <LanguageSwitcher v-model="lang" />
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsla(160, 100%, 37%, 0.2);
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  max-width: 40px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav *:focus {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: hsla(160, 100%, 37%, 1);
}

nav * {
  display: inline-block;
  padding: 0 1rem;
  transition: all ease-in-out 0.3s;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: 0;
    font-size: 1rem;
    padding: 1rem 0;
  }
}
</style>
<style src="@vueform/toggle/themes/default.css"></style>
