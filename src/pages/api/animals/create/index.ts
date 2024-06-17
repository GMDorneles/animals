import { Animal } from "@/types/animal/animal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, species } = req.body as Animal;
    const available = req.body.available || true;
    if (!species || !name) {
      return res.status(400).json({ message: "Existem campos faltando" });
    }

    const Response = await fetch("http://localhost:3001/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, available, species }),
    });
    if (!Response.ok) {
      throw new Error("Erro ao criar");
    }
    const data = await Response.json();
    return res.status(201).json({ data });
  } catch (error) {
    console.error("Erro ao criar animal:", error);
    return res.status(500).json({ message: "Erro ao criar o animal" });
  }
}
