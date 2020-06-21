declare module 'nodemon' {
  interface Options {
    script: string
    ext: string
  }

  interface Nodemon {
    (options: Options): void
    on(event: 'start' | 'quit', callback: () => void): Nodemon
    on(event: 'restart', callback: (files: string[]) => void): Nodemon
  }

  const mod: Nodemon
  export default mod
}
