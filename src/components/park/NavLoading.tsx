import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavLoading } from "@/lib/nav-loading";

let bypass = false;

function samePlace(anchor: HTMLAnchorElement) {
  const url = new URL(anchor.href, window.location.href);
  return url.origin === window.location.origin && url.pathname === window.location.pathname && url.search === window.location.search && url.hash === window.location.hash;
}

function internalLink(anchor: HTMLAnchorElement) {
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  try {
    return new URL(anchor.href, window.location.href).origin === window.location.origin && !samePlace(anchor);
  } catch {
    return false;
  }
}

export function NavLoading() {
  const router = useRouter();
  const visible = useNavLoading((state) => state.visible);

  useEffect(() => {
    return router.subscribe("onResolved", () => {
      useNavLoading.getState().setRouting(false);
    });
  }, [router]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (bypass || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      const button = target.closest("button");
      const goLink = anchor instanceof HTMLAnchorElement && internalLink(anchor);
      const goButton = button instanceof HTMLButtonElement && !button.disabled && button.hasAttribute("data-nav");
      const el = goLink ? anchor : goButton ? button : null;
      if (!el) return;
      event.preventDefault();
      event.stopPropagation();
      useNavLoading.getState().setRouting(true);
      window.setTimeout(() => {
        const holdsBefore = useNavLoading.getState().holds;
        bypass = true;
        el.click();
        bypass = false;
        if (goLink) return;
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (useNavLoading.getState().holds === holdsBefore) useNavLoading.getState().setRouting(false);
          });
        });
      }, 32);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#f3eee4]">
      <p className="text-3xl font-bold text-ink">加載中</p>
    </div>
  );
}
