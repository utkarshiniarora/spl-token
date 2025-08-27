import { Keypair, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
import * as fs from "fs";
import bs58 from "bs58";

const endpoint = "https://api.devnet.solana.com";
const solanaConnection = new Connection(endpoint);

const keypair = Keypair.generate();
console.log(
  `Generated new KeyPair. Wallet PublicKey: `,
  keypair.publicKey.toString()
);

const privateKey = bs58.encode(keypair.secretKey);
console.log(`Wallet PrivateKey:`, privateKey);

const secret_array = keypair.secretKey
  .toString()
  .split(",")
  .map((value: any) => Number(value));

const secret = JSON.stringify(secret_array);

fs.writeFile("secretKey.json", secret, "utf8", function (err: any) {
  if (err) throw err;
  console.log("SecretKey generated successfully");
});

(async () => {
  const airdropSignature = solanaConnection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL
  );
  try {
    const txId = await airdropSignature;
    console.log(`Airdrop Transaction Id: ${txId}`);
    console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`);
  } catch (err) {
    console.log(err);
  }
})();
