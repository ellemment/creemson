import classNames from 'classnames';

import type * as React from 'react';
import { getResponsiveClassNames, getResponsiveStyles } from '#app/ellemment-ui/helpers/get-responsive-styles';
import { mergeStyles } from '#app/ellemment-ui/helpers/merge-styles';

import { type PropDef } from '#app/ellemment-ui/props/prop-def';
import { isResponsiveObject } from '#app/ellemment-ui/utils/is-responsive-object';

type PropDefsWithClassName<T> = T extends Record<string, PropDef>
  ? { [K in keyof T]: T[K] extends { className: string } ? K : never }[keyof T]
  : never;

function mergePropDefs<T extends Record<string, PropDef>[]>(...args: T): Record<string, PropDef> {
  return Object.assign({}, ...args);
}

function extractProps<
  P extends { className?: string; style?: React.CSSProperties; [key: string]: any },
  T extends Record<string, PropDef>[]
>(
  props: P,
  ...propDefs: T
): Omit<P & { className?: string; style?: React.CSSProperties }, PropDefsWithClassName<T[number]>> {
  let className: string | undefined;
  let style: ReturnType<typeof mergeStyles>;
  const extractedProps = { ...props };
  const allPropDefs = mergePropDefs(...propDefs);

  for (const key in allPropDefs) {
    let value = extractedProps[key];
    const propDef = allPropDefs[key];

    if (propDef) {
      // Apply prop def defaults
      if ('default' in propDef && propDef.default !== undefined && value === undefined) {
        value = propDef.default;
      }

      // Apply the default value if the value is not a valid enum value
      if (propDef.type === 'enum' && 'values' in propDef) {
        const values = [propDef.default, ...propDef.values];

        if (!values.includes(value) && !isResponsiveObject(value)) {
          value = propDef.default;
        }
      }

      // Apply the value with defaults
      (extractedProps as Record<string, any>)[key] = value;

      if ('className' in propDef && propDef.className) {
        delete extractedProps[key];

        const isResponsivePropDef = 'responsive' in propDef;
        // Make sure we are not threading through responsive values for non-responsive prop defs
        if (!value || (isResponsiveObject(value) && !isResponsivePropDef)) {
          continue;
        }

        if (isResponsiveObject(value)) {
          // Apply prop def defaults to the `initial` breakpoint
          if ('default' in propDef && propDef.default !== undefined && value.initial === undefined) {
            value.initial = propDef.default;
          }

          // Apply the default value to the `initial` breakpoint when it is not a valid enum value
          if (propDef.type === 'enum' && 'values' in propDef) {
            const values = [propDef.default, ...propDef.values];

            if (!values.includes(value.initial)) {
              value.initial = propDef.default;
            }
          }
        }

        if (propDef.type === 'enum' && 'values' in propDef) {
          const propClassName = getResponsiveClassNames({
            allowArbitraryValues: false,
            value,
            className: propDef.className,
            propValues: propDef.values,
            parseValue: 'parseValue' in propDef ? propDef.parseValue : undefined,
          });

          className = classNames(className, propClassName);
          continue;
        }

        if (propDef.type === 'string' || propDef.type === 'enum | string') {
          const propDefValues = propDef.type === 'string' ? [] : ('values' in propDef ? propDef.values : []);

          const [propClassNames, propCustomProperties] = getResponsiveStyles({
            className: propDef.className,
            customProperties: 'customProperties' in propDef ? propDef.customProperties || [] : [],
            propValues: propDefValues,
            parseValue: 'parseValue' in propDef ? propDef.parseValue : undefined,
            value,
          });

          style = mergeStyles(style, propCustomProperties);
          className = classNames(className, propClassNames);
          continue;
        }

        if (propDef.type === 'boolean' && value) {
          // TODO handle responsive boolean props
          className = classNames(className, propDef.className);
          continue;
        }
      }
    }
  }

  extractedProps.className = classNames(className, props.className);
  extractedProps.style = mergeStyles(style, props.style);
  return extractedProps;
}

export { extractProps };