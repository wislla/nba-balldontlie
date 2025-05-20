declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const comp: DefineComponent<any, any, any>
  export default comp
}
