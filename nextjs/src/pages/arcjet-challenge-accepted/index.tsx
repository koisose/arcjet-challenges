import { GetServerSideProps } from "next";
import arcjet, { tokenBucket } from "@arcjet/next";
import Layout from "@/components/Layout";
import NotRateLimited from "@/components/NotRateLimited";
import RateLimited from "@/components/RateLimited";

export default function ArcjetChallengeAccepted({ rateLimited }: { rateLimited: boolean }) {
  return (
    <Layout>
      <div className="container">
        <h1>Arcjet Security Challenge - Next.js</h1>
        {rateLimited ? <RateLimited /> : <NotRateLimited />}
      </div>
    </Layout>
  );
}
const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  characteristics: ["ip.src"], // track requests by a custom user ID
  rules: [
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      refillRate: 5, // refill 5 tokens per interval
      interval: 60, // refill every 10 seconds
      capacity: 10, // bucket maximum capacity of 10 tokens
    }),
  ],
});
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  console.log(req)
  // const userId = "user123"; // Replace with your authenticated user ID
  const decision = await aj.protect(req, {  requested: 1 });
  console.log("Arcjet decision", decision);
  /**
   * Complete the challenge and use Arcjet to set the value of rateLimited to true
   * when the user has been rate limited.
   */
  // Arcjet code goes here...

  return {
    props: {
      // rateLimited: false,
      rateLimited: decision.isDenied()?true:false,
    },
  };
};
