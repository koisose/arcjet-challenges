import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import NotRateLimited from "@/components/NotRateLimited";
import RateLimited from "@/components/RateLimited";

export default function ArcjetChallengeAccepted({ rateLimited }: { rateLimited: boolean }) {
  const [isLimited, setIsLimited] = useState(rateLimited);
  useEffect(() => {
    setIsLimited(rateLimited);
  }, [rateLimited]);

  return (
    <Layout>
      <div className="container">
        <h1>Arcjet Security Challenge - Next.js</h1>
        {isLimited ? <RateLimited /> : <NotRateLimited />}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  /**
   * Complete the challenge and use Arcjet to set the value of limited to true
   * when the user has been rate limited.
   */
  // Arcjet code goes here...

  return {
    props: {
      rateLimited: false,
    },
  };
};