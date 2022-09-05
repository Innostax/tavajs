import * as fromUser from './user.actions';

describe('userUsers', () => {
  it('should return an action', () => {
    expect(fromUser.userUsers().type).toBe('[User] User Users');
  });
});
