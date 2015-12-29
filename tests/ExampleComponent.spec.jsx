import React from 'react';
import * as TestUtils from 'react-addons-test-utils';

import ExampleComponent from '../src/components/ExampleComponent';

describe('ExampleComponent', () => {
  it('Should render and exist', () => {
    const component = TestUtils.renderIntoDocument(<ExampleComponent />);
    expect(component).to.exist;
  });
});


