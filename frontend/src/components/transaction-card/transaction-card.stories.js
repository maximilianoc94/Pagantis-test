import React from 'react';

import { TransactionCard } from '.';

export default {
  title: 'Components/Transaction Card',
  component: TransactionCard,
};

const Template = (args) => <TransactionCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  transaction: {
    toWallet: '',
  },
};

export const WithValues = Template.bind({});
WithValues.args = {
  transaction: {
    toWallet: 'a8h7HQ3Test',
    amount: 15.99,
  },
  wallets: {
    'Demo User 1': ['a8h7HQ3Test', '1a8h7HQ3Tes2'],
    'Demo User 2': ['a8h7HQ3Tes3', '1a8h7HQ3Tes4'],
  },
};
