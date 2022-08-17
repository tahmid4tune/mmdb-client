import { useReducer } from 'react'

export interface ToastAlertProps {
  message: string
  variant: 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
  visible: boolean
  
}

export function useToastAlert() {
  const initState: ToastAlertProps = {
    message: '',
    visible: false,
    variant: 'primary',
  }

  return useReducer(
    (state: ToastAlertProps, data: Partial<ToastAlertProps>) => ({ ...state, ...data }),
    initState
  )
}
