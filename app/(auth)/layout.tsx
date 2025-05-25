import React from "react";

interface AuthlayoutProps {
  children: React.ReactNode;
}

export default function Authlayout({ children }: AuthlayoutProps) {
  return <div>{children}</div>;
}
