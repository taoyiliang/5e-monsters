"use strict";

define(["scripts/misc"], function (miscLib) {
	return function () {
		return {
			d: miscLib.d,
			getShuffledMonsterList: miscLib.getShuffledMonsterList,
			partialFactory: miscLib.partialFactory,
		};
	};
});
