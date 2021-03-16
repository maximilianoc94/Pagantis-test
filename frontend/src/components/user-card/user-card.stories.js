import React from 'react';

import { UserCard } from '.';

export default {
  title: 'Components/User Card',
  component: UserCard,
};

const Template = (args) => <UserCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: '1',
  loading: false,
  image: 'http://localhost:5000/images/banner-1.webp',
  title: 'Adela Antúnez',
  isFav: false,
};

export const Faved = Template.bind({});
Faved.args = {
  ...Default.args,
  isFav: true,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
