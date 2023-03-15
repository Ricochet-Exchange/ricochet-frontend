'use strict';

module.exports = {
	ci: {
		collect: {
			numberOfRuns: 1,
			staticDistDir: './build',
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
