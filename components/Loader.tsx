import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-y-4">
      <div className="animate-spin w-10 h-10">
        <Image alt="logo" fill src="/logo.png" />
      </div>
      <p className="text-sm text-muted-foreground">Eddie is thinking...</p>
    </div>
  );
};

export default Loader;
