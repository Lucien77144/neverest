<template>
  <NuxtPage />
</template>

<script setup>
import gsap from 'gsap'
import { CustomEase } from 'gsap/all'

gsap.registerPlugin(CustomEase)
</script>
