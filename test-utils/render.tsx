import { render, RenderOptions } from "@testing-library/react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React, { ReactElement } from "react";

const ErrorFallback = ({ error }: { error: Error }) => {
  if (error.message === "redirect") {
    return <div data-testid="redirect-error" />;
  }

  return <div data-testid="error-fallback" />;
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary errorComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: Wrapper, ...options });

export { customRender as render };
