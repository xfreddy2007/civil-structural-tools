import { css } from '@emotion/css';
import { Story, Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';

import BackgroundImage, { BackgroundImageProps } from '.';

const action = actions();

export default {
  title: 'BackgroundImage',
  component: BackgroundImage,
  parameters: { controls: { sort: 'requiredFirst' } },
  // https://storybook.js.org/docs/react/essentials/control#annotation
  argTypes: {
    className: {
      control: false
    }
  },
} as Meta;

const Template:Story<BackgroundImageProps> = (args:Partial<BackgroundImageProps>) => {
  return (
    <div className={css`
      width: 480px;
      border: 1px solid black;
      padding: 5px;
    `}>
      <BackgroundImage
        src="https://fakeimg.pl/1440x200/1abc9c"
        className="w-full h-16 cursor-pointer"
        onClick={() => {
          console.log('BackgroundImage');
        }}
        {...args}
        {...action}
      />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
};

export const Webp = Template.bind({});
Webp.args = {
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  webp: 'https://res.cloudinary.com/demo/image/upload/w_300/sample.webp'
};