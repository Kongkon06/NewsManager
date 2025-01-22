export function generateId() {
    return Math.random().toString(36).substr(2, 9)
  }
  
  export function formatDate(date: string | number | Date) {
    return new Date(date).toISOString().split('T')[0]
  }