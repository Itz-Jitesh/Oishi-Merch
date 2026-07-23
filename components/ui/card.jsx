const _jsxFileName = "";import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef(
  ({ className, ...props }, ref) => (
    React.createElement('div', {
      ref: ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7}}
    )
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => (
    React.createElement('div', { ref: ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 18}} )
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    React.createElement('div', {
      ref: ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}
    )
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    React.createElement('div', { ref: ref, className: cn("text-sm text-muted-foreground", className), ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}} )
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    React.createElement('div', { ref: ref, className: cn("p-6 pt-0", className), ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}} )
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => (
    React.createElement('div', { ref: ref, className: cn("flex items-center p-6 pt-0", className), ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}} )
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
