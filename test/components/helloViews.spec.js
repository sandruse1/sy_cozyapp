'use strict'

/* eslint-env jest */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Hello1 } from 'components/HelloViews/Hello1'
import { Hello2 } from 'components/HelloViews/Hello2'

Enzyme.configure({ adapter: new Adapter() })

describe('Hello components:', () => {
  it('Hello1 should be rendered correctly', () => {
    const component = shallow(<Hello1 />).getElement()
    expect(component).toMatchSnapshot()
  })
  it('Hello2 should be rendered correctly', () => {
    const component = shallow(<Hello2 />).getElement()
    expect(component).toMatchSnapshot()
  })
})
