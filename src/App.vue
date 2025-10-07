<script setup lang="ts">
import { onMounted } from 'vue'
import PriceForm from './components/PriceForm.vue'
import EventLog from './components/EventLog.vue'
import { useLocalStorage } from './composables/useLocalStorage'

const { initCounter } = useLocalStorage()

onMounted(() => {
  initCounter()
})
</script>

<template>
  <div class="app">
    <h1>Тестовое задание - Форма расчета цены</h1>
    <PriceForm />
    <EventLog />
  </div>
</template>

<style scoped>
.app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
}
</style>

