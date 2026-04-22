interface MobileFrameProps {
  children: React.ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-black">
        <div className="w-full bg-white">{children}</div>
      </div>
    </div>
  );
}
