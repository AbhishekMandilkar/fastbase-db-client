import React from 'react'
import { Button } from './ui/button'
import { PowerIcon } from 'lucide-react'
import { useNavigate } from 'react-router'

const DisconnectButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      variant="destructive"
      size={'icon'}
      className="size-8"
      onClick={() =>
        navigate('/', {
          replace: true
        })
      }
    >
      <PowerIcon />
    </Button>
  )
}

export default DisconnectButton
