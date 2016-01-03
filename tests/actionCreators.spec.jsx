import { actionOne } from '../src/actions/index';
import { ACTION_ONE } from '../src/actions/index';

describe('actionOne action creator', () => {
  it('should return a someProp with its action', () => {
    const payload = 'sample';
    const expectedAction = {
      type: ACTION_ONE,
      someProp: payload
    };

    const result = actionOne(payload);

    expect(result.type).to.equal(expectedAction.type);
    expect(result.someProp).to.equal(expectedAction.someProp);
  });
});


