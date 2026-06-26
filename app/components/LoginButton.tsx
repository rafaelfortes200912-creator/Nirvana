"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <img src={session.user?.image || ""} alt="" className="w-7 h-7 rounded-full" />
        <span className="text-sm">{session.user?.name}</span>
        <button onClick={() => signOut()} className="text-xs text-gray-400 hover:text-white">Sair</button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")} className="hover:text-gray-300 transition-colors text-xl">
      👤
    </button>
  );
}