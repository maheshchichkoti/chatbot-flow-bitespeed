import React from "react";

export default function TopBanner({
  message,
  type = "error",
}: {
  message: string | null;
  type?: "error" | "success";
}) {
  if (!message) return null;

  const styles =
    type === "error"
      ? "bg-red-100 text-red-800 border-red-200"
      : "bg-green-100 text-green-800 border-green-200";

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 top-4 z-50">
      <div className={`border px-4 py-2 rounded-md shadow ${styles}`}>
        {message}
      </div>
    </div>
  );
}
