import * as React from "react";
import { canUseDOM } from '#app/creemson/utils/can-use-dom.ts';

const noop = () => {};
export const useLayoutEffect = canUseDOM ? React.useLayoutEffect : noop;
