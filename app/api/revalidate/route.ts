import { revalidatePath } from "next/cache";

// onyl used for e2e tests
export async function POST() {
  revalidatePath("/");
  revalidatePath("/dives");
  revalidatePath("/new-dive");

  return new Response();
}
