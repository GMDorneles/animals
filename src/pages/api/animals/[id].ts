import { Animal } from "@/types/animal/animal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Animal | { message: string }>
): Promise<void> {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { id } = req.query;
    const { name, species, available } = req.body as Animal;
    if (!id) {
      return res.status(400).json({ message: "O id é obrigatório" });
    }

    const Response = await fetch(`http://localhost:3001/animal/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, available, species }),
    });
    if (!Response.ok) {
      throw new Error("Erro ao atualzar");
    }
    const data = (await Response.json()) as Animal;
    return res.status(201).json(data);
  } catch (error) {
    console.error("Erro ao criar atualizar:", error);
    return res.status(500).json({ message: "Erro ao criar o animal" });
  }
}
