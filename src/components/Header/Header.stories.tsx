import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from './Header';

export default {
  title: 'App/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});

LoggedIn.args = {
  user: {
    firstName: 'John',
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
