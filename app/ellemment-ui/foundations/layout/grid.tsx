// 

import classNames from 'classnames';
import * as React from 'react';

import  { type ComponentPropsWithout, type RemovedProps } from '#app/ellemment-ui/helpers/component-props';
import { extractProps } from '#app/ellemment-ui/helpers/extract-props';
import { gridPropDefs , type GridOwnProps } from '#app/ellemment-ui/props/grid-props';
import { layoutPropDefs ,type  LayoutProps } from '#app/ellemment-ui/props/layout-props';
import { marginPropDefs , type MarginProps } from '#app/ellemment-ui/props/margin-props';
import { Slot } from '#app/ellemment-ui/utils/slot';


type GridElement = React.ElementRef<'div'>;
interface CommonGridProps extends MarginProps, LayoutProps, GridOwnProps {}
type GridDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type GridSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
type GridProps = CommonGridProps & (GridSpanProps | GridDivProps);

const Grid = React.forwardRef<GridElement, GridProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    ...gridProps
  } = extractProps(props, gridPropDefs, layoutPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : Tag;
  return <Comp {...gridProps} ref={forwardedRef} className={classNames('rt-Grid', className)} />;
});
Grid.displayName = 'Grid';

export { Grid };
export type { GridProps };