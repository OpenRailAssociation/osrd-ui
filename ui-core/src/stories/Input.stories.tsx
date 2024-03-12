import type {Meta, StoryObj} from '@storybook/react';
import Input from '../components/inputs/Input';

const meta: Meta<typeof Input> = {
    component: Input,
    args:{
        small:false,
        disabled: false,
        readOnly: false
    }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args:{
        label:"Your name",
        type:"text",
    }
}

export const Value: Story = {
    args:{
        label:"Your name",
        type:"text",
        value:"Manuel"
    }
}

export const Hint: Story = {
    args:{
        label:"Your name",
        type:"text",
        value:"Manuel",
        hint:"It doesn't have to be real"
    }
}

export const LeadingContent: Story = {
    args:{
        label:"Price",
        type:"number",
        leadingContent:"£",
    }
}

export const TrainlingContent: Story = {
    args:{
        label:"Price",
        type:"number",
        trailingContent:"€",
    }
}

export const LeadingAndTrainlingContent: Story = {
    args:{
        label:"Price",
        type:"number",
        leadingContent:"Minimum",
        trailingContent:"Km/h",
    }
}

export const CheckIndicator: Story = {
    args:{
        label:"Your name",
        type:"text",
        value:"Manuel",
        checkIndicator:true
    }
}

export const RequiredInput: Story = {
    args:{
        label:"Your name",
        type:"text",
        required:true
    }
}