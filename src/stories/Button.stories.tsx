import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonSC } from '../styles/ButtonSC';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'App/Button',
  component: ButtonSC,
} as ComponentMeta<typeof ButtonSC>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonSC> = (args) => (
  <ButtonSC {...args} />
);

// Primary Auto Width
export const PrimaryDefault = Template.bind({});
PrimaryDefault.args = {
  primary: true,
  children: 'Primary',
};

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  primary: true,
  size: 'small',
  children: 'Primary Small',
};

export const PrimaryLarge = Template.bind({});
PrimaryLarge.args = {
  primary: true,
  size: 'large',
  children: 'Primary Large',
};

// Primary Wide
export const PrimaryDefaultWide = Template.bind({});
PrimaryDefaultWide.args = {
  primary: true,
  children: 'Primary',
  isWide: true,
};

export const PrimarySmallWide = Template.bind({});
PrimarySmallWide.args = {
  primary: true,
  size: 'small',
  children: 'Primary Small',
  isWide: true,
};

export const PrimaryLargeWide = Template.bind({});
PrimaryLargeWide.args = {
  primary: true,
  size: 'large',
  children: 'Primary Large',
  isWide: true,
};

// Secondary Auto Width
export const SecondaryDefault = Template.bind({});
SecondaryDefault.args = {
  children: 'Secondary',
};

export const SecondarySmall = Template.bind({});
SecondarySmall.args = {
  size: 'small',
  children: 'Secondary Small',
};

export const SecondaryLarge = Template.bind({});
SecondaryLarge.args = {
  size: 'large',
  children: 'Secondary Large',
};

// Secondary Wide
export const SecondaryDefaultWide = Template.bind({});
SecondaryDefaultWide.args = {
  children: 'Secondary',
  isWide: true,
};

export const SecondarySmallWide = Template.bind({});
SecondarySmallWide.args = {
  size: 'small',
  children: 'Secondary Small',
  isWide: true,
};

export const SecondaryLargeWide = Template.bind({});
SecondaryLargeWide.args = {
  size: 'large',
  children: 'Secondary Large',
  isWide: true,
};
