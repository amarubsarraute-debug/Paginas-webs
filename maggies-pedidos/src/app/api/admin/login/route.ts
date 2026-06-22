import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_MAX_AGE, checkPassword, createSessionValue } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      {
        error: "not_configured",
        message: "Falta definir ADMIN_PASSWORD en las variables de entorno.",
      },
      { status: 503 }
    );
  }

  let password = "";
  try {
    ({ password } = (await req.json()) as { password: string });
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "invalid", message: "Contraseña incorrecta." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await createSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}

// Cerrar sesión.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
