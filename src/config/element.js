
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
// 基础组件
export const basicComponents = [
  {
    label: '输入框',
    type: 'input',
    options: {
      width: '200px',
      defaultValue: '',
      placeholder: '请输入',
      maxlength: null,
      prefix: '',
      suffix: '',
      prepend: '',
      append: '',
      disabled: false,
      clearable: false,
      readonly: false,
      rules
    }
  },
  {
    label: '下拉选择框',
    type: 'select',
    options: {
      defaultValue: '',
      width: '200px',
      multiple: false,
      placeholder: '请选择',
      filterable: false,
      clearable: false,
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
    label: '计数器',
    type: 'number',
    options: {
      width: '200px',
      defaultValue: 0,
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      rules
    }
  },
  {
    label: '单选框组',
    type: 'radio',
    options: {
      defaultValue: '',
      width: '200px',
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
      width: '200px',
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
      width: '200px',
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
      width: '200px',
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
    label: '评分',
    type: 'rate',
    options: {
      defaultValue: 0,
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
      width: '200px',
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      range: false,
      rules
    }
  },
  {
    label: '文字',
    type: 'text',
    options: {
      defaultValue: 'This is a text'
    }
  }
]
// 高级组件
export const advanceComponents = [
  {
    label: '图片',
    type: 'img-upload',
    options: {
      defaultValue: [],
      name: 'file',
      action: 'http://example.com/upload',
      method: 'post',
      listType: 'text',
      accept: 'image/*',
      limit: 3,
      multiple: false,
      disabled: false,
      rules
    }
  },
  {
    label: '富文本编辑器',
    type: 'richtext-editor',
    options: {
      defaultValue: '',
      width: '200px',
      disabled: false
    }
  },
  {
    label: '级联选择器',
    type: 'cascader',
    options: {
      defaultValue: [],
      width: '200px',
      placeholder: '',
      disabled: false,
      clearable: false,
      filterable: false,
      remote: true,
      remoteOptions: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules
    }
  }
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
