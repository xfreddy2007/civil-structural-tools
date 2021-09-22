import { css } from '@emotion/css';
import { Story, Meta } from '@storybook/react';

import PureImage from './PureImage';
import type { PureImageProps } from './PureImage';

export default {
  title: 'PureImage',
  component: PureImage,
  parameters: { controls: { sort: 'requiredFirst' } },
  // https://storybook.js.org/docs/react/essentials/control#annotation
  argTypes: {
    className: {
      control: false
    }
  },
} as Meta;

const Template:Story<PureImageProps> = () => {
  return (
    <div className={css``}>
      <PureImage
        src="https://fakeimg.pl/800x200/1abc9c"
        data-any="hi, 9527"
        onClick={() => {
          console.log('PureImage');
        }}
      />
      <div className="block p-10">
        <PureImage
          className="max-w-full"
          src="https://fakeimg.pl/800x1000/ffbc9c"
        />
      </div>
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {};
