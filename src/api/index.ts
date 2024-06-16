import { Animal } from "@/types/animal/animal";

export async function getAnimals(): Promise<Animal[]> {
  try {
    const res = await fetch("http://localhost:3001/animals");
    if (!res.ok) {
      throw new Error("Erro ao buscar");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar os dados dos animais:", error);
    throw error;
  }
}
