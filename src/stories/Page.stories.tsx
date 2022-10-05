import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { Page } from './Page';

export default {
  title: 'App/Page',
  component: Page,
  parameters: {
    user: {},
  },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const LoggedOut = Template.bind({});

export const LoggedIn = Template.bind({});

LoggedIn.args = {
  user: {
    firstName: 'John',
  },
};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
LoggedOut.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const loginButton = await canvas.getByRole('button', { name: /Login/i });
  await userEvent.click(loginButton);
};
