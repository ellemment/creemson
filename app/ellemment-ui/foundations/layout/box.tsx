// app/ellemment-ui/foundations/layout/box.tsx

import classNames from 'classnames';
import * as React from 'react';

import  { type ComponentPropsWithout, type RemovedProps } from '#app/ellemment-ui/helpers/component-props';
import { extractProps } from '#app/ellemment-ui/helpers/extract-props';
import { boxPropDefs , type BoxOwnProps } from '#app/ellemment-ui/props/box.props';
import { layoutPropDefs ,type  LayoutProps } from '#app/ellemment-ui/props/layout-props';
import { marginPropDefs , type MarginProps } from '#app/ellemment-ui/props/margin-props.ts';
import { Slot } from '#app/ellemment-ui/utils/slot';


type BoxElement = React.ElementRef<'div'>;
interface CommonBoxProps extends MarginProps, LayoutProps, BoxOwnProps {}
type BoxDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type BoxSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
type BoxProps = CommonBoxProps & (BoxSpanProps | BoxDivProps);

const Box = React.forwardRef<BoxElement, BoxProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    ...boxProps
  } = extractProps(props, boxPropDefs, layoutPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : Tag;
  return <Comp {...boxProps} ref={forwardedRef} className={classNames('rt-Box', className)} />;
});
Box.displayName = 'Box';

export { Box };
export type { BoxProps };