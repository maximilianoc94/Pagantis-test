import React from 'react';
import { WalletsList } from '.';

import mockData from './mock-data';

export default {
  title: 'Components/Wallets List',
  component: WalletsList,
};

const Template = (args) => <WalletsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  wallets: mockData,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
