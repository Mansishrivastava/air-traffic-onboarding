import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import WelcomeScreen from "./WelcomeScreen";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { RouterDecorator } from "../../mocks/nextRouter";

const meta: Meta<typeof WelcomeScreen> = {
  title: "Screens/WelcomeScreen",
  component: WelcomeScreen,
  decorators: [
    RouterDecorator,
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: "WelcomeScreen is the entry point for new users. It greets the user and provides navigation to onboarding.",
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof WelcomeScreen>;

export const Default: Story = { args: {} };
export const EdgeCase: Story = { args: {} };
export const ErrorState: Story = { args: {} };
export const Playground: Story = {
  args: {},
  parameters: { controls: { expanded: true } },
};
