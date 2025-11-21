import React from "react";
import TopNav from "../components/TopNav";

export default function MainLayout({ children }) {
  return (
    <div>
      <TopNav />
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}
