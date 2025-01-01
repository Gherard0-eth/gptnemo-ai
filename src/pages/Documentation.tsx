import React from 'react';

const Documentation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1 className="text-3xl font-display mb-8">Epirates Documentation</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-display mb-4">Project Overview</h2>
          <p className="text-apple-gray-500 dark:text-apple-gray-300">
            Epirates is a web3-based treasure hunting game where users can explore islands,
            dig for treasures, and earn rewards. The application is built using React,
            TypeScript, and Tailwind CSS.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-display mb-4">Core Features</h2>
          <ul className="space-y-4 text-apple-gray-500 dark:text-apple-gray-300">
            <li>
              <strong>Treasure Hunting:</strong> Users can explore different islands and dig for
              treasures using shovels.
            </li>
            <li>
              <strong>Wallet Integration:</strong> Connect cryptocurrency wallets for transactions
              and rewards.
            </li>
            <li>
              <strong>Profile System:</strong> Track user progress, shovel count, and treasure
              history.
            </li>
            <li>
              <strong>Real-time Updates:</strong> Live leaderboard and recent finds tracking.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-display mb-4">Technical Architecture</h2>
          
          <h3 className="text-xl font-display mb-3">State Management</h3>
          <ul className="mb-6 text-apple-gray-500 dark:text-apple-gray-300">
            <li><code>useShovelStore</code>: Manages shovel inventory</li>
            <li><code>useUserStore</code>: Handles user data and authentication</li>
            <li><code>usePrizePoolStore</code>: Tracks prize pool amounts</li>
            <li><code>useLeaderboardStore</code>: Manages leaderboard data</li>
          </ul>

          <h3 className="text-xl font-display mb-3">Key Components</h3>
          <ul className="mb-6 text-apple-gray-500 dark:text-apple-gray-300">
            <li><code>PirateChat</code>: AI assistant interface</li>
            <li><code>IslandMap</code>: Interactive treasure map</li>
            <li><code>RealTimeInfo</code>: Live updates and leaderboard</li>
            <li><code>Profile</code>: User profile and treasure history</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-display mb-4">Data Flow</h2>
          <p className="text-apple-gray-500 dark:text-apple-gray-300">
            The application uses Zustand for state management and React Query for data fetching.
            User actions trigger state updates which are reflected across the UI in real-time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display mb-4">UI Components</h2>
          <p className="text-apple-gray-500 dark:text-apple-gray-300">
            The UI is built using Shadcn UI components and custom Tailwind CSS classes.
            Key styling patterns include:
          </p>
          <ul className="text-apple-gray-500 dark:text-apple-gray-300">
            <li><code>apple-container</code>: Glass-morphism container style</li>
            <li><code>apple-button</code>: Consistent button styling</li>
            <li><code>apple-text</code>: Typography system</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Documentation;