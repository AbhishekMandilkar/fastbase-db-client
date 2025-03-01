import { useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { appDB, appSchema } from '../../../../../shared/lib/app-db'
import { Connection, ConnectionConfig } from '../../../../../shared/types'
import Url from 'url-parse'
import { actionsProxy } from '@/lib/action-proxy'
import { useNavigate } from "react-router";
import { z } from 'zod'
import {useDatabaseDispatch} from '@/pages/database/slice/database-slice'

// Add validation schema
const connectionSchema = z.object({
  nickname: z.string().min(1, 'Nickname is required'),
  host: z.string().min(1, 'Host is required'),
  port: z.string().regex(/^\d+$/, 'Port must be a number').transform(Number).pipe(
    z.number().min(1, 'Port must be greater than 0').max(65535, 'Port must be less than 65536')
  ),
  user: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  database: z.string().min(1, 'Database name is required'),
})

type ValidationErrors = {
  [K in keyof z.infer<typeof connectionSchema>]?: string;
}

export const useCreateConnection = () => {
  const [urlInput, setUrlInput] = useState('')
  const [importFromUrlDialogOpen, setImportFromUrlDialogOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  // Add refs for form inputs
  const hostInputRef = useRef<HTMLInputElement>(null)
  const portInputRef = useRef<HTMLInputElement>(null)
  const userInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const databaseInputRef = useRef<HTMLInputElement>(null)
  const navigation = useNavigate()
  const nicknameInputRef = useRef<HTMLInputElement>(null)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const createConnection = actionsProxy.createConnection.useMutation({
    async onSuccess(_, variables) {
      try {
        await actionsProxy.createConnection.invoke(variables)
        navigation(`/connection/${variables.id}`)
      } catch (error) {
        console.error('Failed to create connection:', error)
      }
    }
  })

  const parseAndFillForm = (connectionUrl: string) => {
    try {
      const url = new Url(connectionUrl)
      const auth = url.auth.split(':')

      if (hostInputRef.current) {
        hostInputRef.current.value = url.hostname
      }
      if (portInputRef.current) {
        portInputRef.current.value = url.port || '5432'
      }
      if (userInputRef.current) {
        userInputRef.current.value = auth[0] || ''
      }
      if (passwordInputRef.current) {
        passwordInputRef.current.value = auth[1] || ''
      }
      if (databaseInputRef.current) {
        databaseInputRef.current.value = url.pathname.slice(1) || ''
      }
      if (nicknameInputRef.current) {
        nicknameInputRef.current.value = url.pathname.slice(1) || ''
      }
      setUrlInput('')
      setImportFromUrlDialogOpen(false)
    } catch (error) {
      console.error('Failed to parse connection URL:', error)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')
    parseAndFillForm(pastedText)
  }

  const validateForm = () => {
    const formData = {
      nickname: nicknameInputRef.current?.value || '',
      host: hostInputRef.current?.value || '',
      port: portInputRef.current?.value || '',
      user: userInputRef.current?.value || '',
      password: passwordInputRef.current?.value || '',
      database: databaseInputRef.current?.value || '',
    }

    try {
      connectionSchema.parse(formData)
      setValidationErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: ValidationErrors = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof ValidationErrors] = err.message
          }
        })
        setValidationErrors(errors)
      }
      return false
    }
  }

  const handleConnect = async () => {
    try {
      if (!validateForm()) {
        return
      }

      setIsConnecting(true)
      await createConnection.mutateAsync({
        nickname: nicknameInputRef.current?.value || '',
        type: 'postgresql',
        host: hostInputRef.current?.value || '',
        port: portInputRef.current?.value || '5432',
        user: userInputRef.current?.value || '',
        password: passwordInputRef.current?.value || '',
        database: databaseInputRef.current?.value || '',
        id: crypto.randomUUID(),
        createdAt: new Date(),
        url: urlInput
      })
      setIsConnecting(false)
    } catch (error) {
      console.error('Failed to connect to database:', error)
      setIsConnecting(false)
    }
  }

  const handleImport = () => {
    parseAndFillForm(urlInput)
    setImportFromUrlDialogOpen(false)
    setUrlInput('')
  }

  const handleImportFromUrlDialogOpen = (value: boolean) => {
    setImportFromUrlDialogOpen(value)
  }

  return {
    importFromUrlDialogOpen,
    handleImportFromUrlDialogOpen,
    urlInput,
    setUrlInput,
    handlePaste,
    handleImport,
    handleConnect,
    nicknameInputRef,
    hostInputRef,
    portInputRef,
    userInputRef,
    passwordInputRef,
    databaseInputRef,
    isConnecting,
    validationErrors,
    validateForm,
  }
}
