import RateLimited from "../../components/RateLimited";
import NotRateLimited from "../../components/NotRateLimited";

export function ArcjetChallenge() {
  /**
   * Complete the challenge and use Arcjet to set the value of limited to true
   * when the user has been rate limited.
   */
  // Arcjet code goes here...
  const limited = false;

  // We include the correct component based on the value of limited
  const content = limited ? RateLimited() : NotRateLimited();

  return `
    <h1>Arcjet Challenge Accepted!</h1>
    ${content}
  `;
}
