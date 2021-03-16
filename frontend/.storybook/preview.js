import { Provider } from 'react-redux';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import '!style-loader!css-loader!sass-loader!../src/scss/global.scss';
import store from '../src/redux/store';

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      mobile1: {
        name: 'Small mobile',
        styles: {
          height: '568px',
          width: '375px',
        },
        type: 'mobile',
      },
    },
  },
};
