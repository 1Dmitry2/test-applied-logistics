import { ref } from 'vue'

export interface EventData {
  id: string
  timestamp: Date
  type: 'input_change' | 'button_click' | 'backend_response'
  data: any
}

const events = ref<EventData[]>([])

export function useEventLogger() {
  const logEvent = (type: EventData['type'], data: any) => {
    const event: EventData = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      type,
      data
    }
    
    // Добавляем событие в начало массива (самое свежее сверху)
    events.value.unshift(event)
  }

  const getEvents = () => events.value

  const clearEvents = () => {
    events.value = []
  }

  return {
    events,
    logEvent,
    getEvents,
    clearEvents
  }
}
