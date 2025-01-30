import {useMutation} from '@tanstack/react-query'
import {useRef, useState} from 'react'
import {appDB, appSchema} from '../../../../../shared/lib/app-db'
import {Connection, ConnectionConfig} from '../../../../../shared/types'
import Url from 'url-parse'
import {actionsProxy} from '@/lib/action-proxy'


export const useCreateConnection = () => {
    const [urlInput, setUrlInput] = useState('')
    const [importFromUrlDialogOpen, setImportFromUrlDialogOpen] = useState(false)
    // Add refs for form inputs
    const hostInputRef = useRef<HTMLInputElement>(null)
    const portInputRef = useRef<HTMLInputElement>(null)
    const userInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const databaseInputRef = useRef<HTMLInputElement>(null)
    const nicknameInputRef = useRef<HTMLInputElement>(null)

    const createConnection = actionsProxy.createConnection.useMutation({
      onSuccess(_, variables) {
        console.log('createConnection', variables)
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
        createConnection.mutateAsync({
          nickname: nicknameInputRef.current?.value || '',
          type: 'postgresql',
          host: url.hostname,
          port: url.port || '5432',
          user: auth[0] || '',
          password: auth[1] || '',
          database: url.pathname.slice(1) || '',
          id: crypto.randomUUID(),
          createdAt: new Date()
        })
      } catch (error) {
        console.error('Failed to parse connection URL:', error)
      }
    }
  
    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedText = e.clipboardData.getData('text')
      // parseAndFillForm(pastedText)
    }
  
    const handleImport = () => {
      parseAndFillForm(urlInput)
      setImportFromUrlDialogOpen(false)
      setUrlInput('')
    }
  
    const handleImportAndConnect = () => {
      // parseAndFillForm(urlInput)
      setImportFromUrlDialogOpen(false)
      setUrlInput('')
      // Add your connection logic here
      console.log('Connecting to database...')
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
        handleImportAndConnect,
        nicknameInputRef,
        hostInputRef,
        portInputRef,
        userInputRef,
        passwordInputRef,
        databaseInputRef
    }
}