// import AntdDesignForm from './core/antd/AntdDesignForm.vue'
// import AntdGenerateForm from './core/antd/AntdGenerateForm.vue'
import ElDesignForm from './core/element/ElDesignForm.vue'
// import ElGenerateForm from './core/element/ElGenerateForm.vue'
import Icons from './icons'
import '@/styles/index.less'

Icons.install()

// AntdDesignForm.install = (app) => {
//   app.component(AntdDesignForm.name, AntdDesignForm)
// }

// AntdGenerateForm.install = (app) => {
//   app.component(AntdGenerateForm.name, AntdGenerateForm)
// }
ElDesignForm.install = (app) => {
  app.component(ElDesignForm.name, ElDesignForm)
}

// ElGenerateForm.install = (app) => {
//   app.component(ElGenerateForm.name, ElGenerateForm)
// }

const components = [
  // AntdDesignForm,
  // AntdGenerateForm,
  ElDesignForm,
  // ElGenerateForm
]

const install = (app) => {
  components.forEach(component => app.component(component.name, component))
}

export {
  install,
  // AntdDesignForm,
  // AntdGenerateForm,
  ElDesignForm,
  // ElGenerateForm
}

export default {
  install,
  // AntdDesignForm,
  // AntdGenerateForm,
  ElDesignForm,
  // ElGenerateForm
}
