import ElDesignForm from './core/element/ElDesignForm.vue'
// import ElGenerateForm from './core/element/ElGenerateForm.vue'
import Icons from './icons'
import '@/styles/index.less'

Icons.install()


ElDesignForm.install = (app) => {
  app.component(ElDesignForm.name, ElDesignForm)
}

// ElGenerateForm.install = (app) => {
//   app.component(ElGenerateForm.name, ElGenerateForm)
// }

const components = [
  ElDesignForm,
  // ElGenerateForm
]

const install = (app) => {
  components.forEach(component => app.component(component.name, component))
}

export {
  install,
  ElDesignForm,
  // ElGenerateForm
}

export default {
  install,
  ElDesignForm,
  // ElGenerateForm
}
