import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Button} from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from "@/components/ui/scroll-area"
import {AlertCircle} from 'lucide-react';

import React from 'react'

const DatabaseError = (props: { error?: Error | null; errorInfo?: React.ErrorInfo | null }) => {
  if (!props.error) {
    return null
  }
  return (
    <div className="w-full mx-auto flex justify-center items-center max-w-2xl">
      <Alert variant="destructive">
        <AlertCircle className="size-6" />
        <AlertTitle className="font-bold text-lg">Error: {props.error?.message}</AlertTitle>
        <AlertDescription>
          <ScrollArea className="h-48">
            <p>{props.errorInfo?.componentStack}</p>
          </ScrollArea>
          <div className="flex justify-end pt-4 gap-2 text-primary">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
                Go to connection
            </Button>
            <Button variant="default" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default DatabaseError
