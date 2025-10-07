import { ref, computed } from 'vue'

export interface StorageData {
  counter: number
  price: number
  qty: number
  amount: number
}

const STORAGE_KEY = 'priceFormData'
const counter = ref<number>(0)

export function useLocalStorage() {
  const localStorageData = computed(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Ошибка при чтении localStorage:', error)
      return null
    }
  })

  const getFromStorage = (): StorageData | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Ошибка при чтении localStorage:', error)
      return null
    }
  }

  const saveToStorage = async (data: StorageData): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          counter.value++
          const dataToSave = { ...data, counter: counter.value }
          
          const isEven = data.amount % 2 === 0
          
          if (isEven) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
            resolve({ success: true })
          } else {
            resolve({ success: false })
          }
        } catch (error) {
          console.error('Ошибка при сохранении в localStorage:', error)
          resolve({ success: false })
        }
      }, 1000)
    })
  }

  const initCounter = () => {
    const savedData = getFromStorage()
    if (savedData) {
      counter.value = savedData.counter
    }
  }

  return {
    localStorageData,
    counter,
    getFromStorage,
    saveToStorage,
    initCounter
  }
}
