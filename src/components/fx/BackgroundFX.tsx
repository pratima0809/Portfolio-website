"use client";

import NetworkCanvas from "@/components/fx/NetworkCanvas";

export default function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-void" />
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(640px 420px at 78% -8%, rgba(34,211,238,0.09), transparent 70%)," +
            "radial-gradient(560px 400px at 8% 18%, rgba(56,130,246,0.06), transparent 70%)," +
            "radial-gradient(700px 520px at 50% 118%, rgba(52,211,153,0.05), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.35]">
        <NetworkCanvas />
      </div>
      <div className="scanlines absolute inset-0" />
    </div>
  );
}