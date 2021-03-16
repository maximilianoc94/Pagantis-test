import React from 'react';

import { TransactionModal } from '.';

export default {
  title: 'Components/Transaction Modal',
  component: TransactionModal,
};

const Template = (args) => <TransactionModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  currentWallet: {
    user_id: '1',
    hash: 'TestWalletHash',
    coins: 20.95,
  },
  storedUser: {
    id: '1',
    name: 'Demo User 1',
  },
  handleClose: () => {},
};
