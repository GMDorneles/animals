export async function getAnimals() {
  const res = await fetch("http://localhost:3000/api/animals");
  if (!res.ok) {
    throw new Error("Failed to fetch animals.");
  }
  return await res.json();
}
