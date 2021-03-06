/**
 * External dependencies
 */
import { danger, warn, markdown } from 'danger';

// Skip danger check if "no ci" or "no danger" in latest commit
const lastCommit = danger.git.commits.slice( -1 )[ 0 ].message;
if (
	lastCommit.includes( 'no ci' ) ||
	lastCommit.includes( 'skip ci' ) ||
	lastCommit.includes( 'no danger' ) ||
	lastCommit.includes( 'skip danger' )
) {
	process.exit( 0 ); // eslint-disable-line no-process-exit
}

// No PR is too small to include a description of why you made a change
if ( danger.github.pr.body.length < 10 ) {
	warn( 'Please include a description of your PR changes.' );
}

// Use labels please!
const ghLabels = danger.github.issue.labels;
if ( ! ghLabels.find( l => l.name.toLowerCase().includes( '[status]' ) ) ) {
	warn( 'The PR is missing at least one [Status] label. Suggestions: `[Status] In Progress`, `[Status] Needs Review`' );
}

// Test instructions
if ( ! danger.github.pr.body.includes( 'Testing instructions' ) ) {
	warn( '"Testing instructions" are missing for this PR. Please add some' );
}

// Proposed changelog entry
if ( ! danger.github.pr.body.includes( 'Proposed changelog entry' ) ) {
	warn( '"Proposed changelog entry" is missing for this PR. Please include any meaningful changes' );
}

markdown( "This is automated (and not very smart btw) check which relies on [`PULL_REQUEST_TEMPLATE`](https://github.com/Automattic/jetpack/blob/master/.github/PULL_REQUEST_TEMPLATE.md).We encourage you to follow that template as it helps Jetpack maintainers do their job. If you think 'Testing instructions' or 'Proposed changelog entry' are not needed for your PR - please explain why you think so. Thanks for cooperation :robot:" );
