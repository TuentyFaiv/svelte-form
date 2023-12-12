export type UserEvent<Element extends HTMLElement, E extends Event = Event> = E & {
  currentTarget: EventTarget & Element;
};
