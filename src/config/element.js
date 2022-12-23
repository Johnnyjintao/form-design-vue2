
const rules = {
  trigger: 'blur',
  enum: '',
  len: undefined,
  max: undefined,
  message: '',
  min: undefined,
  pattern: '',
  required: false,
  type: ''
}

export const widgetForm = {
  list: [], //已选的组件列表
  config: { //表单配置信息
    size: 'default',
    hideRequiredAsterisk: false,
    labelWidth: 100,
    labelPosition: 'right'
  }
}
// 表单组件
export const basicComponents = [
  {
    label: '输入框',
    type: 'input',
    options: {
      width: '100%',
      defaultValue: '',
      placeholder: '请输入',
      maxlength: null,
      prefix: '',
      suffix: '',
      prepend: '',
      append: '',
      disabled: false,
      clearable: true,
      readonly: false,
      rules
    }
  },
  {
    label: '下拉选择框',
    type: 'select',
    options: {
      defaultValue: "",
      width: '100%',
      multiple: false,
      placeholder: '请选择',
      filterable: false,
      clearable: true,
      disabled: false,
      props: {
        label: 'label',
        value: 'value'
      },
      options: [
        {
          label: 'label1',
          value: 'value1'
        },
        {
          label: 'label2',
          value: 'value2'
        },
        {
          label: 'label3',
          value: 'value3'
        }
      ],
      rules
    }
  },
  {
    label: '单选框组',
    type: 'radio',
    options: {
      defaultValue: '',
      width: '100%',
      inline: true,
      remote: false,
      showLabel: false,
      options: [
        {
          label: 'label1',
          value: 'value1'
        },
        {
          label: 'label2',
          value: 'value2'
        },
        {
          label: 'label3',
          value: 'value3'
        }
      ],
      props: {
        value: 'value',
        label: 'label'
      },
      disabled: false,
      rules
    }
  },
  {
    label: '多选框组',
    type: 'checkbox',
    options: {
      defaultValue: [],
      width: '100%',
      inline: true,
      remote: false,
      showLabel: false,
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      options: [
        {
          label: 'Option 1',
          value: 'Option 1'
        },
        {
          label: 'Option 2',
          value: 'Option 2'
        },
        {
          label: 'Option 3',
          value: 'Option 3'
        }
      ],
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      disabled: false,
      rules
    }
  },
  {
    label: '时间选择器',
    type: 'time',
    options: {
      defaultValue: '',
      width: '100%',
      placeholder: '请选择时间',
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss',
      readonly: false,
      editable: true,
      clearable: true,
      disabled: false,
      rules
    }
  },
  {
    label: '日期选择器',
    type: 'date',
    options: {
      type:"date",
      defaultValue: '',
      width: '100%',
      placeholder: '请选择',
      format: '',
      readonly: false,
      editable: true,
      clearable: true,
      disabled: false,
      rules
    }
  },
  {
    label: '数字范围',
    type: 'numrange',
    options: {
      min:0,
      max:0,
      width: '100%',
      minPlaceholder: '请输入最小值',
      maxPlaceholder: '请输入最大值',
      format: '',
      readonly: false,
      editable: true,
      clearable: true,
      disabled: false,
      rules
    }
  },
  {
    label: '评分',
    type: 'rate',
    options: {
      defaultValue: null,
      max: 5,
      allowHalf: false,
      disabled: false,
      rules
    }
  },

  {
    label: '开关',
    type: 'switch',
    options: {
      defaultValue: false,
      disabled: false,
      activeText: '',
      inactiveText: '',
      rules
    }
  },
  {
    label: '滑块',
    type: 'slider',
    options: {
      defaultValue: 0,
      width: '100%',
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      range: false,
      rules
    }
  }
]
// 展示组件
export const advanceComponents = [
  {
    label: '文字',
    type: 'text',
    options: {
      defaultValue: 'This is a text',
      style: '',
    }
  },
  {
    label: '图片',
    type: 'image',
    options: {
      width:"100%",
      imgWidth:"100px",
      imgHeight:"100px",
      srcList: [{url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"}],
      previewSrcList:[{url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"}],
    }
  },
]
// 布局组件
export const layoutComponents = [
  {
    label: '栅格布局',
    type: 'grid',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  }
]
