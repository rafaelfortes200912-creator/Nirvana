import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase.auth.admin.listUsers();
  const usuarios = data?.users.map(u => ({
    id: u.id,
    email: u.email,
    nome: u.user_metadata?.nome || "N/A",
    criado_em: new Date(u.created_at).toLocaleDateString("pt-PT"),
  })) || [];

  return NextResponse.json(usuarios);
}