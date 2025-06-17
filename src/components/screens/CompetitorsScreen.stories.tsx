import type { Meta, StoryObj } from '@storybook/nextjs';
import CompetitorsScreen from './CompetitorsScreen';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";

// const meta: Meta<typeof CompetitorsScreen> = {
//   title: 'Screens/CompetitorsScreen',
//   component: CompetitorsScreen,
//   parameters: {
//     layout: 'fullscreen',
//   },
//   tags: ['autodocs'],
// };

// export default meta;

// Mock the Next.js router
const RouterDecorator = (Story: React.ComponentType) => {
  return (
    <div>
      <Story />
    </div>
  );
};

const meta: Meta<typeof CompetitorsScreen> = {
  title: "Screens/CompetitorsScreen",
  component: CompetitorsScreen,
  decorators: [
    RouterDecorator,
    (Story) => <ThemeProvider theme={theme}><Story /></ThemeProvider>,
  ],
  parameters: {
    docs: {
      description: {
        component: "CompetitorsScreen allows users to create a new account with form validation.",
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof CompetitorsScreen>;

export const Default: Story = { args: {} };
export const EdgeCase: Story = { args: {} };
export const ErrorState: Story = { args: {} };
export const Playground: Story = {
  args: {},
  parameters: { controls: { expanded: true } },
}; 