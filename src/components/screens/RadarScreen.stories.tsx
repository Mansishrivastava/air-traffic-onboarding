import type { Meta, StoryObj } from '@storybook/nextjs';
import RadarScreen from './RadarScreen';
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

const meta: Meta<typeof RadarScreen> = {
  title: "Screens/RadarScreen",
  component: RadarScreen,
  decorators: [
    RouterDecorator,
    (Story) => <ThemeProvider theme={theme}><Story /></ThemeProvider>,
  ],
  parameters: {
    docs: {
      description: {
        component: "RadarScreen provides a comprehensive overview of tracked entities, activities, and insights in a radar-like visualization.",
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadarScreen>;

export const Default: Story = { args: {} };
export const EdgeCase: Story = { args: {} };
export const ErrorState: Story = { args: {} };
export const Playground: Story = {
  args: {},
  parameters: { controls: { expanded: true } },
}; 