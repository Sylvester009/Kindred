import { getMemberNetwork } from "@/lib/services/network";

async function main() {
  const result = await getMemberNetwork("741206", 3);

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});