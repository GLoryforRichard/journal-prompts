/**
 * Credit distribution script for GitHub Actions or cron.
 * Checks if credits module is enabled, then runs distributeCreditsToAllUsers directly
 * (no API call) to avoid timeout with large user counts.
 */
import { distributeCreditsToAllUsers } from '../src/credits/distribute';

async function main() {
  console.log('CREDIT_WORKFLOW_ENABLED:', process.env.CREDIT_WORKFLOW_ENABLED);
  // Workflow can force-run via CREDIT_WORKFLOW_ENABLED; otherwise use app config
  const workflowEnabled = process.env.CREDIT_WORKFLOW_ENABLED === 'true';
  if (!workflowEnabled) {
    console.log('Credit workflow is not enabled, skip distribution.');
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
