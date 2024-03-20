import type {Meta, StoryObj} from '@storybook/react';
import TokenInput from '../components/inputs/TokenInput/TokenInput';

const meta: Meta<typeof TokenInput> = {
    component: TokenInput,
    args:{
        label: "Favorite colors",
        tokens:["Yellow", "Orange", "Red", "Black"]
    }
};

export default meta;
type Story = StoryObj<typeof TokenInput>;

export const Default: Story = {
    args:{}
}