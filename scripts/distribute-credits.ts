/**
 * Credit distribution script for GitHub Actions or cron.
 * Checks if credits module is enabled, then runs distributeCreditsToAllUsers directly
 * (no API call) to avoid timeout with large user counts.
 */
import { websiteConfig } from '../src/config/website';
import { distributeCreditsToAllUsers } from '../src/credits/distribute';

async function main() {
  // Allow workflow to run via CREDIT_WORKFLOW_ENABLED env var
  const workflowEnabled = process.env.CREDIT_WORKFLOW_ENABLED === 'true';
  const creditsEnabled = websiteConfig.credits?.enableCredits === true;

  if (!workflowEnabled || !creditsEnabled) {
    console.log('Credits module is not enabled, skip distribution.');
    process.exit(0);
  }

  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is required for credit distribution.');
    process.exit(1);
  }

  console.log('>>> Credit distribution script start');
  try {
    const result = await distributeCreditsToAllUsers();
    console.log(
      `<<< Credit distribution done. users: ${result.usersCount}, processed: ${result.processedCount}, errors: ${result.errorCount}`
    );
    process.exit(0);
  } catch (error) {
    console.error('Credit distribution failed:', error);
    process.exit(1);
  }
}

main();
