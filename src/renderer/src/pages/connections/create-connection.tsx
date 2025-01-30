import React, { useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

import { Plug } from 'lucide-react'
import ImportUrlDialog from './import-url-dialog'
import { useCreateConnection } from './hooks/use-create-connection'

const CreateConnection = () => {
  const {
    importFromUrlDialogOpen,
    handleImportFromUrlDialogOpen,
    urlInput,
    setUrlInput,
    handleImport,
    handleImportAndConnect,
    hostInputRef,
    portInputRef,
    userInputRef,
    passwordInputRef,
    databaseInputRef,
    nicknameInputRef
  } = useCreateConnection()

  return (
    <div className="w-full mx-auto flex justify-center items-center">
      <Card className="min-w-[40%]">
        <CardHeader>
          <CardTitle>Create PostgreSQL Connection</CardTitle>
          <CardDescription>Create a new connection to a PostgreSQL database</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid w-full items-center gap-4 grid-cols-2">
          <div className="flex flex-col space-y-1.5 col-span-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input id="nickname" ref={nicknameInputRef} placeholder="Enter connection nickname" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="host">Host</Label>
              <Input id="host" ref={hostInputRef} placeholder="localhost" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="port">Port</Label>
              <Input id="port" ref={portInputRef} placeholder="5432" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user">User</Label>
              <Input id="user" ref={userInputRef} placeholder="Enter username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                ref={passwordInputRef}
                placeholder="Enter password"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="database">Database</Label>
              <Input id="database" ref={databaseInputRef} placeholder="Enter database name" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <ImportUrlDialog
            isOpen={importFromUrlDialogOpen}
            onOpenChange={handleImportFromUrlDialogOpen}
            urlInput={urlInput}
            onUrlInputChange={(value) => setUrlInput(value)}
            onImport={handleImport}
            onImportAndConnect={handleImportAndConnect}
          />
          <Button variant="default">
            {' '}
            <Plug />
            Connect
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CreateConnection
