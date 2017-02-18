import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Chat from '../../../src/common/components/Chat';

describe('CoolComponent', () => {
  let wrapper;
  const props = {
    channelID: 'test',
    dispatch: () => {},
    user: {},
    messages: [],
    socket: {}
  }
  beforeEach(() => {
    wrapper = shallow(
      <Chat {...props} />
    )
  })

  it('should have some elements', () => {
    expect(wrapper.find('.chat').length).to.equal(1);
    expect(wrapper.find('.chat-header').length).to.equal(1);
    expect(wrapper.find('.chat-messages-wrapper').length).to.equal(1);
    expect(wrapper.find('.chat-messages-scrollable').length).to.equal(1);
  });
});
