export type Bridge = {
  registerHandler: (
    listener: string,
    responseCallBack: (
      data: unknown,
      callback: (data: unknown) => void,
    ) => void,
  ) => void;
  callHandler: (
    nativeEvent: string,
    data: unknown,
    responseCallBack: (data: unknown) => void,
  ) => void;
};
