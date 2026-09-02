import { Toaster } from "@/components/ui/sonner";
import { router } from "@/lib/router";
import { I18nProvider } from "@/lib/translations";
import { RouterProvider } from "@tanstack/react-router";

export default function App() {
  return (
    <I18nProvider>
      <RouterProvider router={router} />
      <Toaster theme="dark" position="bottom-right" />
    </I18nProvider>
  );
}
