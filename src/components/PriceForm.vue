<template>
  <div class="price-form">
    <div class="form-row">
      <div class="input-group">
        <label for="price">Цена:</label>
        <input
          id="price"
          v-model.number="price"
          type="number"
          step="0.01"
          placeholder="Введите цену"
        />
      </div>
      
      <div class="input-group">
        <label for="quantity">Количество:</label>
        <input
          id="quantity"
          v-model.number="quantity"
          type="number"
          placeholder="Введите количество"
        />
      </div>
      
      <div class="input-group">
        <label for="amount">Сумма:</label>
        <input
          id="amount"
          v-model.number="amount"
          type="number"
          step="0.01"
          placeholder="Сумма"
        />
      </div>
      
      <button @click="handleSubmit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
      </button>
    </div>
    
    <div class="labels-row">
      <div class="label-group">
        <span class="label">Цена: {{ price || 0 }}</span>
      </div>
      
      <div class="label-group">
        <span class="label">Количество: {{ quantity || 0 }}</span>
      </div>
      
      <div class="label-group">
        <span class="label">Сумма: {{ amount || 0 }}</span>
      </div>
      
      <div class="label-group">
        <span class="label">localStorage: {{ localStorageData }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useEventLogger } from '../composables/useEventLogger'
import { useLocalStorage } from '../composables/useLocalStorage'

const { logEvent } = useEventLogger()
const { 
  saveToStorage, 
  getFromStorage, 
  localStorageData, 
  counter 
} = useLocalStorage()


const price = ref<number>(0)
const quantity = ref<number>(0)
const amount = ref<number>(0)
const isSubmitting = ref<boolean>(false)

let debounceTimer: number | null = null

const debounce = (func: Function, delay: number) => {
  return (...args: any[]) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => func.apply(null, args), delay)
  }
}

const recalculateFields = (changedField: 'price' | 'quantity' | 'amount') => {
  if (changedField === 'price') {
    amount.value = price.value * quantity.value
  } else if (changedField === 'quantity') {
    amount.value = price.value * quantity.value
  } else if (changedField === 'amount') {
    if (quantity.value !== 0) {
      price.value = amount.value / quantity.value
    } else if (price.value !== 0) {
      quantity.value = amount.value / price.value
    }
  }
}

const debouncedPriceChange = debounce(() => {
  recalculateFields('price')
  logEvent('input_change', { field: 'price', value: price.value })
}, 300)

const debouncedQuantityChange = debounce(() => {
  recalculateFields('quantity')
  logEvent('input_change', { field: 'quantity', value: quantity.value })
}, 300)

const debouncedAmountChange = debounce(() => {
  recalculateFields('amount')
  logEvent('input_change', { field: 'amount', value: amount.value })
}, 300)

watch(price, debouncedPriceChange)
watch(quantity, debouncedQuantityChange)
watch(amount, debouncedAmountChange)

const handleSubmit = async () => {
  const submitData = {
    counter: counter.value,
    price: price.value,
    qty: quantity.value,
    amount: amount.value
  }
  
  logEvent('button_click', { 
    submittedData: submitData, 
    localStorageAtClick: getFromStorage() 
  })
  
  isSubmitting.value = true
  
  try {
    const result = await saveToStorage(submitData)
    
    if (result.success) {
      logEvent('backend_response', { 
        response: result, 
        localStorageAfterResponse: getFromStorage() 
      })
    } else {
      logEvent('backend_response', { 
        response: result, 
        localStorageAfterResponse: getFromStorage() 
      })
    }
  } catch (error) {
    console.error('Ошибка при сохранении:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  const savedData = getFromStorage()
  if (savedData) {
    price.value = savedData.price || 0
    quantity.value = savedData.qty || 0
    amount.value = savedData.amount || 0
  }
})
</script>

<style scoped>
.price-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: end;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-group label {
  font-weight: bold;
  font-size: 14px;
}

.input-group input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 120px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  height: fit-content;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.labels-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.label-group {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 14px;
  color: #666;
  background-color: #f8f9fa;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  min-width: 120px;
  text-align: center;
}
</style>
