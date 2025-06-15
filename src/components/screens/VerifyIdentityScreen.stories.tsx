import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import VerifyIdentityScreen from "./VerifyIdentityScreen";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { RouterDecorator } from "../../mocks/nextRouter";

const meta: Meta<typeof VerifyIdentityScreen> = {
  title: "Screens/VerifyIdentityScreen",
  component: VerifyIdentityScreen,
  decorators: [
    RouterDecorator,
    (Story) => <ThemeProvider theme={theme}><Story /></ThemeProvider>,
  ],
  parameters: {
    docs: {
      description: {
        component: "VerifyIdentityScreen handles the identity verification process.",
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof VerifyIdentityScreen>;

export const Default: Story = { args: {} };
export const EdgeCase: Story = { args: {} };
export const ErrorState: Story = { args: {} };
export const Playground: Story = {
  args: {},
  parameters: { controls: { expanded: true } },
}; 