

type Actions = typeof import('./actions').actions

// remove the first argument of each object method
export type ActionsProxy = {
  [K in keyof Actions]: {
    invoke: Actions[K] extends (context: any, input: infer P) => Promise<infer R>
      ? (input: P) => Promise<R>
      : never
  }
}
