import React from 'react';
import mockUserList from './mock-data';

import { UserList } from '.';

export default {
  title: 'Components/Users List',
  component: UserList,
};

const Template = (args) => <UserList {...args} />;

export const Default = Template.bind({});
Default.decorators = [(Story) => <div style={{ width: 1600 }}>{Story()}</div>];
Default.args = {
  users: mockUserList,
};

export const Loading = Template.bind({});
Loading.decorators = Default.decorators;
Loading.args = {
  loading: true,
};
