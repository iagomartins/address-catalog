<template>
  <header class="w-full bg-teal-500/20 border-b border-teal-500/30 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Navigation -->
        <div class="flex items-center gap-4">
          <img
            alt="Vue logo"
            class="h-10 w-10"
            src="@/assets/logo.svg"
          />
          <nav class="hidden md:flex items-center gap-4">
            <RouterLink
              to="/"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-white bg-teal-500/20"
            >
              {{ t('home') }}
            </RouterLink>
          </nav>
        </div>

        <!-- Language Switcher -->
        <div class="flex items-center">
          <LanguageSwitcher />
        </div>

        <!-- Mobile menu button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-teal-500/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!mobileMenuOpen"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-show="mobileMenuOpen" class="md:hidden border-t border-teal-500/30 py-4">
        <nav class="flex flex-col gap-2">
          <RouterLink
            to="/"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-white bg-teal-500/20"
            @click="mobileMenuOpen = false"
          >
            {{ t('home') }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const mobileMenuOpen = ref(false)
</script>
