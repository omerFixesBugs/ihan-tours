export default function PlaneOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-clip">
      <div className="sticky top-[50vh] ml-auto h-[600px] w-[600px] -translate-y-1/2 translate-x-[30%] rotate-180 opacity-[0.07] drop-shadow-2xl md:h-[1200px] md:w-[1200px]">
        <img 
          src="/out_0001.png" 
          alt="Ambient Traveling Plane" 
          className="h-full w-full object-contain mix-blend-screen" 
        />
      </div>
    </div>
  );
}
