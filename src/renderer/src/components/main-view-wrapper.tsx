import {cn} from '@/lib/utils'
import React from 'react'

const FullScreenView = (props: { children: React.ReactNode, className?: string }) => {
  return <div className={cn("w-full h-full", props.className)}>{props.children}</div>
}

export default FullScreenView