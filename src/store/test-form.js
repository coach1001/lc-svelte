export default {
  elementType: 'obj',
  elementSubType: null,
  property: 'step',
  childElements: [
    {
      elementType: 'prim',
      elementSubType: 'boolean',
      property: 'showFirstName',
      validations: [],
      reactivity: []
    },
    {
      elementType: 'prim',
      elementSubType: 'text',
      property: 'firstName',
      validations: [
        { type: 'requiredIf', value: 'showFirstName', scope: 'parent' },
        { type: 'minLength', value: '2' }
      ],
      reactivity: [
        { type: 'visibleWhen', expression: '(showFirstName == true)' },
        { type: 'clearWhen', expression: '(showFirstName == false || showFirstName == null)' }
      ]
    },
    {
      elementType: 'prim',
      elementSubType: 'number',
      property: 'age',
      validations: [],
      reactivity: []
    },
    {
      elementType: 'arrPrim',
      elementSubType: 'text',
      property: 'hobbies',
      validations: [],
      reactivity: []
    },
    {
      elementType: 'arrObj',
      elementSubType: null,
      property: 'children',
      arrValidations: [],
      arrReactivity: [],
      objValidations: [],
      objReactivity: [],            
      childElements: [
        {
          elementType: 'prim',
          elementSubType: 'boolean',
          property: 'biological',
        },
        {
          elementType: 'obj',
          elementSubType: null,
          property: 'detail',
          childElements: [
            {
              elementType: 'prim',
              elementSubType: 'text',
              property: 'firstName'
            }
          ]
        }
      ]
    },
    {
      elementType: 'obj',
      elementSubType: null,
      property: 'spouse',
      validations: [],
      reactivity: [],      
      childElements: [
        {
          elementType: 'prim',
          elementSubType: 'text',
          property: 'firstName'
        }
      ]
    }
  ]
}