import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

export const mergeClassnames = (args: ClassNameValue[]) => {
  return twMerge(clsx(...args));
};
