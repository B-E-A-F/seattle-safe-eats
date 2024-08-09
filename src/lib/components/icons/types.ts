import type { SVGAttributes } from 'svelte/elements';

export type Attrs = SVGAttributes<SVGSVGElement>;

export interface IconProps extends Attrs {
  name?: string;
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  class?: string;
}

export type IconEvents = {
  [evt: string]: CustomEvent<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type IconSlots = {
  default: {}; // eslint-disable-line @typescript-eslint/ban-types
};
