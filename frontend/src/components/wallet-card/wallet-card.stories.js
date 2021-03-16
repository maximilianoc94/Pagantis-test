import React from 'react';

import { WalletCard } from '.';

export default {
  title: 'Components/Wallet Card',
  component: WalletCard,
};

const Template = (args) => <WalletCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  walletHash: 'b8b9413cf28a2a4a6da9b56c',
  coinsAmount: 100000,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
