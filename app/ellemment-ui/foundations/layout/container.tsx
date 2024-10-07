// 

import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import * as React from 'react';

import  { type ComponentPropsWithout, type RemovedProps } from '#app/ellemment-ui/helpers/component-props.ts';
import { extractProps } from '#app/ellemment-ui/helpers/extract-props';
import { getSubtree } from '#app/ellemment-ui/helpers/get-subtree';
import  { type ContainerOwnProps , containerPropDefs } from '#app/ellemment-ui/props/container.props.ts';
import { heightPropDefs } from '#app/ellemment-ui/props/height-props';
import  { type LayoutProps , layoutPropDefs } from '#app/ellemment-ui/props/layout-props';
import  { type MarginProps , marginPropDefs } from '#app/ellemment-ui/props/margin-props';
import { widthPropDefs } from '#app/ellemment-ui/props/width-props';


type ContainerElement = React.ElementRef<'div'>;
interface ContainerProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    MarginProps,
    LayoutProps,
    ContainerOwnProps {}
const Container = React.forwardRef<ContainerElement, ContainerProps>(
  ({ width, minWidth, maxWidth, height, minHeight, maxHeight, ...props }, forwardedRef) => {
    const { asChild, children, className, ...containerProps } = extractProps(
      props,
      containerPropDefs,
      layoutPropDefs,
      marginPropDefs
    );

    const { className: innerClassName, style: innerStyle } = extractProps(
      { width, minWidth, maxWidth, height, minHeight, maxHeight },
      widthPropDefs,
      heightPropDefs
    );

    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        {...containerProps}
        ref={forwardedRef}
        className={classNames('rt-Container', className)}
      >
        {getSubtree({ asChild, children }, (children) => (
          <div className={classNames('rt-ContainerInner', innerClassName)} style={innerStyle}>
            {children}
          </div>
        ))}
      </Comp>
    );
  }
);
Container.displayName = 'Container';

export { Container };
export type { ContainerProps };