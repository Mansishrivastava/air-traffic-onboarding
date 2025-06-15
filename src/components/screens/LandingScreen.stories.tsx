import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import LandingScreen from "./LandingScreen";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { RouterDecorator } from "../../mocks/nextRouter";

const meta: Meta<typeof LandingScreen> = {
  title: "Screens/LandingScreen",
  component: LandingScreen,
  decorators: [
    RouterDecorator,
    (Story) => <ThemeProvider theme={theme}><Story /></ThemeProvider>,
  ],
  parameters: {
    docs: {
      description: {
        component: "LandingScreen is the main landing page for the application.",
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof LandingScreen>;

export const Default: Story = { args: {} };
export const EdgeCase: Story = { args: {} };
export const ErrorState: Story = { args: {} };
export const Playground: Story = {
  args: {},
  parameters: { controls: { expanded: true } },
}; 