<template>
  <div class="event-log">
    <h3>Журнал событий</h3>
    <div class="events-container">
      <div 
        v-for="event in events" 
        :key="event.id" 
        class="event-item"
        :class="event.type"
      >
        <div class="event-header">
          <span class="event-type">{{ getEventTypeLabel(event.type) }}</span>
          <span class="event-time">{{ formatTime(event.timestamp) }}</span>
        </div>
        <div class="event-content">
          <pre>{{ formatEventData(event) }}</pre>
        </div>
      </div>
      
      <div v-if="events.length === 0" class="no-events">
        События пока не зарегистрированы
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { } from 'vue'
import { useEventLogger, type EventData } from '../composables/useEventLogger'

const { events } = useEventLogger()

const getEventTypeLabel = (type: EventData['type']): string => {
  switch (type) {
    case 'input_change':
      return 'Изменение поля'
    case 'button_click':
      return 'Нажатие кнопки'
    case 'backend_response':
      return 'Ответ сервера'
    default:
      return 'Неизвестное событие'
  }
}

const formatTime = (timestamp: Date): string => {
  return timestamp.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }) + '.' + timestamp.getMilliseconds().toString().padStart(3, '0')
}

const formatEventData = (event: EventData): string => {
  const data = { ...event.data }
  
  switch (event.type) {
    case 'input_change':
      return `Поле: ${data.field}\nЗначение: ${data.value}`
    
    case 'button_click':
      return `Отправленные данные:\n${JSON.stringify(data.submittedData, null, 2)}\n\nlocalStorage на момент нажатия:\n${JSON.stringify(data.localStorageAtClick, null, 2)}`
    
    case 'backend_response':
      return `Ответ сервера: ${JSON.stringify(data.response, null, 2)}\n\nlocalStorage после ответа:\n${JSON.stringify(data.localStorageAfterResponse, null, 2)}`
    
    default:
      return JSON.stringify(data, null, 2)
  }
}
</script>

<style scoped>
.event-log {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.event-log h3 {
  margin: 0;
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  font-weight: 600;
}

.events-container {
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
}

.event-item {
  margin-bottom: 15px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
}

.event-item.input_change {
  border-left: 4px solid #17a2b8;
}

.event-item.button_click {
  border-left: 4px solid #ffc107;
}

.event-item.backend_response {
  border-left: 4px solid #28a745;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.event-type {
  font-weight: 600;
  font-size: 14px;
}

.event-time {
  font-size: 12px;
  color: #6c757d;
  font-family: monospace;
}

.event-content {
  padding: 15px;
}

.event-content pre {
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  color: #495057;
  white-space: pre-wrap;
  word-break: break-word;
}

.no-events {
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
  font-style: italic;
}

.events-container::-webkit-scrollbar {
  width: 6px;
}

.events-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.events-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.events-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
