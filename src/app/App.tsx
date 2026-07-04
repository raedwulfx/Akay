import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { initialErrands, type Errand } from "./data/errands";
import LiveOverview from "./components/ui/LiveOverview";
import { Home as HomeIcon, Package as PackageIcon, ShoppingBag as ShoppingBagIcon, User as UserIcon, X as XIcon } from "lucide-react";
import { ChatScreen } from "./screens/ChatScreen";
import { FeedScreen } from "./screens/FeedScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { RequestCreatorScreen } from "./screens/RequestCreatorScreen";

type RouteName = "home" | "feed" | "create" | "chat";

function getInitialRoute(path = window.location.pathname): RouteName {
  switch (path) {
    case "/feed":
      return "feed";
    case "/create":
      return "create";
    case "/chat":
      return "chat";
    default:
      return "home";
  }
}

function toPath(route: RouteName) {
  switch (route) {
    case "feed":
      return "/feed";
    case "create":
      return "/create";
    case "chat":
      return "/chat";
    default:
      return "/";
  }
}

const navItems: Array<{ label: string; route: RouteName; Icon: any }> = [
  { label: "Home", route: "home", Icon: HomeIcon },
  { label: "Feed", route: "feed", Icon: PackageIcon },
  { label: "Create", route: "create", Icon: ShoppingBagIcon },
  { label: "Chat", route: "chat", Icon: UserIcon },
];

export default function App() {
  const [route, setRoute] = useState<RouteName>(() => getInitialRoute());
  const [errands, setErrands] = useState<Errand[]>(initialErrands);
  const [acceptedErrandId, setAcceptedErrandId] = useState<number | null>(null);
  const [selectedErrandId, setSelectedErrandId] = useState<number>(initialErrands[0].id);
  const [showLiveBubble, setShowLiveBubble] = useState(false);
  const [bubblePosition, setBubblePosition] = useState({ x: 16, y: 96 });
  const [isDraggingBubble, setIsDraggingBubble] = useState(false);
  const bubblePositionRef = useRef(bubblePosition);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const pointerIdRef = useRef<number | null>(null);
  const movedRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => setRoute(getInitialRoute(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextRoute: RouteName) => {
    setRoute(nextRoute);
    window.history.pushState({}, "", toPath(nextRoute));
  };

  const handleAccept = (errandId: number) => {
    setAcceptedErrandId(errandId);
    setSelectedErrandId(errandId);
    navigate("chat");
  };

  const handleCreateRequest = (request: Errand) => {
    setErrands((current) => [request, ...current]);
    setSelectedErrandId(request.id);
    setAcceptedErrandId(request.id);
  };

  const selectedErrand = errands.find((errand) => errand.id === selectedErrandId) ?? errands[0];

  useEffect(() => {
    bubblePositionRef.current = bubblePosition;
  }, [bubblePosition]);

  useEffect(() => {
    if (!isDraggingBubble) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (pointerIdRef.current !== null && event.pointerId !== pointerIdRef.current) return;

      const nextX = Math.max(12, Math.min(window.innerWidth - 64, event.clientX - dragOffsetRef.current.x));
      const nextY = Math.max(12, Math.min(window.innerHeight - 88, event.clientY - dragOffsetRef.current.y));

      if (Math.abs(event.clientX - (bubblePositionRef.current.x + dragOffsetRef.current.x)) + Math.abs(event.clientY - (bubblePositionRef.current.y + dragOffsetRef.current.y)) > 4) {
        movedRef.current = true;
      }

      bubblePositionRef.current = { x: nextX, y: nextY };
      setBubblePosition({ x: nextX, y: nextY });
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (pointerIdRef.current !== null && event.pointerId !== pointerIdRef.current) return;

      const bubbleWidth = 56;
      const snappedX = bubblePositionRef.current.x + bubbleWidth / 2 < window.innerWidth / 2 ? 16 : window.innerWidth - bubbleWidth - 16;
      const clampedY = Math.max(12, Math.min(window.innerHeight - bubbleWidth - 16, bubblePositionRef.current.y));

      bubblePositionRef.current = { x: snappedX, y: clampedY };
      setBubblePosition({ x: snappedX, y: clampedY });
      setIsDraggingBubble(false);
      pointerIdRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDraggingBubble]);

  const handleBubblePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    movedRef.current = false;
    pointerIdRef.current = event.pointerId;
    dragOffsetRef.current = {
      x: event.clientX - bubblePositionRef.current.x,
      y: event.clientY - bubblePositionRef.current.y,
    };
    setIsDraggingBubble(true);
  };

  const handleBubbleClick = () => {
    if (!movedRef.current) {
      setShowLiveBubble((value) => !value);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc,_#f4f4f5)] px-4 py-8 text-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-[32px] border border-zinc-200 bg-white/80 px-6 py-4 shadow-sm backdrop-blur">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-400">Neighborhood errand network</p>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Akay</h1>
          </div>
          <nav className="hidden sm:flex flex-wrap gap-2 rounded-full border border-zinc-200 bg-zinc-50 p-1">
            {navItems.map(({ label, route: targetRoute }) => (
              <button
                key={targetRoute}
                onClick={() => navigate(targetRoute)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${route === targetRoute ? "bg-zinc-950 text-white" : "text-zinc-600 hover:text-zinc-900"}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </header>

        <main className="grid gap-6 pb-[calc(5rem+env(safe-area-inset-bottom))] sm:pb-0 lg:grid-cols-[1.65fr_0.95fr]">
          <section className="min-h-[640px] pb-[calc(5rem+env(safe-area-inset-bottom))] sm:pb-0">
            {route === "home" && <HomeScreen onNavigate={navigate} />}
            {route === "feed" && (
              <FeedScreen
                errands={errands}
                acceptedErrandId={acceptedErrandId}
                onAccept={handleAccept}
                onNavigate={navigate}
              />
            )}
            {route === "create" && (
              <RequestCreatorScreen onCreateRequest={handleCreateRequest} onNavigate={navigate} />
            )}
            {route === "chat" && selectedErrand && (
              <ChatScreen errand={selectedErrand} onNavigate={navigate} />
            )}
          </section>

          <aside className="hidden lg:block rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm">
            <LiveOverview errands={errands} acceptedErrandId={acceptedErrandId} selectedErrand={selectedErrand} route={route} />
          </aside>
        </main>
      </div>
      {/* Mobile: floating live overview bubble and bottom nav */}
      <div className="sm:hidden">
        <button
          onPointerDown={handleBubblePointerDown}
          onClick={handleBubbleClick}
          aria-label="Live overview"
          className={`fixed z-40 flex h-14 w-14 touch-none items-center justify-center rounded-full bg-zinc-950 text-white shadow-lg transition-all duration-300 ease-out ${isDraggingBubble ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ left: bubblePosition.x, top: bubblePosition.y }}
        >
          {errands.length}
        </button>

        {showLiveBubble && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowLiveBubble(false)} />
            <div className="relative mx-4 mb-24 w-full max-w-md rounded-2xl bg-white p-4 shadow-xl transition-all duration-300 ease-out">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">Live overview</p>
                  <h2 className="mt-1 text-lg font-semibold text-zinc-900">Your errands</h2>
                </div>
                <button onClick={() => setShowLiveBubble(false)} className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500">
                  <XIcon size={16} />
                </button>
              </div>

              <div className="mt-4">
                <LiveOverview errands={errands} acceptedErrandId={acceptedErrandId} selectedErrand={selectedErrand} route={route} />
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
          <div className="mx-auto flex max-w-md items-center justify-between rounded-[24px] border border-zinc-200 bg-white/95 p-2 shadow-lg backdrop-blur">
            {navItems.map(({ label, route: targetRoute, Icon }) => (
              <button key={label} onClick={() => navigate(targetRoute)} className="flex-1 rounded-2xl p-2 text-center text-zinc-600 transition hover:bg-zinc-50">
                <div className="flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <div className="mt-1 hidden text-[10px] font-semibold uppercase sm:block">{label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
