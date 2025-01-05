// hooks/useAppToast.ts
import { useToast } from '@/hooks/use-toast'

export function useAppToast() {
  const { toast } = useToast()

  const showToast = (title: string, description: string, variant: 'default' | 'destructive' = 'default') => {
    toast({ title, description, variant })
  }

  return { showToast }
}
