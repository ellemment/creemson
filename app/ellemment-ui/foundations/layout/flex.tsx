import classNames from 'classnames';
import * as React from 'react';

import  { type ComponentPropsWithout, type RemovedProps } from '#app/ellemment-ui/helpers/component-props';
import { extractProps } from '#app/ellemment-ui/helpers/extract-props';
import { flexPropDefs ,type  FlexOwnProps } from '#app/ellemment-ui/props/flex-props';

import { layoutPropDefs , type LayoutProps } from '#app/ellemment-ui/props/layout-props';
import { marginPropDefs , type MarginProps } from '#app/ellemment-ui/props/margin-props';
import { Slot } from '#app/ellemment-ui/utils/slot';

type FlexElement = React.ElementRef<'div'>;
interface CommonFlexProps extends MarginProps, LayoutProps, FlexOwnProps {}
type FlexDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type FlexSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
type FlexProps = CommonFlexProps & (FlexSpanProps | FlexDivProps);

const Flex = React.forwardRef<FlexElement, FlexProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    ...flexProps
  } = extractProps(props, flexPropDefs, layoutPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : Tag;
  return <Comp {...flexProps} ref={forwardedRef} className={classNames('rt-Flex', className)} />;
});
Flex.displayName = 'Flex';

export { Flex };
export type { FlexProps };