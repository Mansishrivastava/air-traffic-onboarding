import React from "react";
import type { Meta, StoryObj } from '@storybook/nextjs';
import CreateAccountScreen from "./CreateAccountScreen";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";

// Mock the Next.js router
const RouterDecorator = (Story: React.ComponentType) => {
  return (
    <div>
      <Story />
    </div>
  );
};

const meta: Meta<typeof CreateAccountScreen> = {
  title: "Screens/CreateAccountScreen",
  component: CreateAccountScreen,
  decorators: [
    RouterDecorator,
    (Story) => <ThemeProvider theme={theme}><Story /></ThemeProvider>,
  ],
  parameters: {
    docs: {
      description: {
        component: "CreateAccountScreen allows users to create a new account with form validation.",
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof CreateAccountScreen>;

export const Default: Story = { args: {} };
export const EdgeCase: Story = { args: {} };
export const ErrorState: Story = { args: {} };
export const Playground: Story = {
  args: {},
  parameters: { controls: { expanded: true } },
}; 