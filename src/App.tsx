import Shell from "./components/layout/Shell";
import { useAppStore } from "./stores/appStore";
import { useUIStore } from "./stores/useUIStore";
import { useEffect } from "react";
import * as ipc from "./bridge/ipc";
import "./styles/global.css";
import "./styles/components.css";

export default function App() {
  const { settings, loadAll } = useAppStore();
  const { loaded } = useUIStore();

  useEffect(() => {
    if (!loaded) {
      loadAll();
      return;
    }
    if (loaded) {
      ipc.setWindowOpacity(settings.opacity, settings.theme ?? "system").catch(() => {});
    }
  }, [settings.opacity, loaded]);

  if (!loaded)
    return (
      <div className="app-loading">
        <div className="loading-spinner" />
      </div>
    );
  return <Shell />;
}
