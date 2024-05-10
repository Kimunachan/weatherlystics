import ReactQueryProvider from "@/components/ReactQueryProvider";
import {
  RenderResult,
  render as customRender,
  renderHook as customRenderHook,
} from "@testing-library/react";
import React from "react";

const render = (ui: JSX.Element, { ...renderOptions } = {}): RenderResult => {
  const wrapper = ({ children }: { children?: React.ReactNode }) => {
    return <ReactQueryProvider>{children}</ReactQueryProvider>;
  };
  return customRender(ui, { wrapper, ...renderOptions });
};

const renderHook = <TResult, TProps>(callback: (props: TProps) => TResult) =>
  customRenderHook<TResult, TProps>(callback, {
    wrapper: ({ children }) => (
      <ReactQueryProvider>{children}</ReactQueryProvider>
    ),
  });

export * from "@testing-library/react";

export { render, renderHook };
