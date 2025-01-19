import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Vue directive to autofocus an input element when it is mounted.
 *
 * @example
 * <template>
 *   <input v-focus />
 * </template>
 */
export const vFocus = {
  mounted: (el: { focus: () => any }) => el.focus(),
};
