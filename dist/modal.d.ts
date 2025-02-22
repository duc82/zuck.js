import { TimelineItem, ZuckObject } from "types";
export declare const modal: (zuck: ZuckObject) => {
  show: (storyId?: TimelineItem["id"]) => void;
  next: () => void;
  close: () => void;
};
