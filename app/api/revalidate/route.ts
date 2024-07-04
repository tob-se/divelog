import { revalidatePath } from "next/cache";

export async function POST() {
  revalidatePath("/");
  revalidatePath("/dives");
  revalidatePath("/new-dive");

  return new Response();
}
