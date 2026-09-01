import { Toaster } from "@/components/ui/sonner";
import { router } from "@/lib/router";
import { RouterProvider } from "@tanstack/react-router";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster theme="dark" position="bottom-right" />
    </>
  );
}
