import { Animal } from "@/types/animal/animal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Animal | { message: string }>
): Promise<void> {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "O id é obrigatório" });
    }

    const response = await fetch(`http://localhost:3001/animal/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar o animal");
    }
    const data = (await response.json()) as Animal;
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar o animal:", error);
    return res.status(500).json({ message: "Erro ao buscar o animal" });
  }
}
