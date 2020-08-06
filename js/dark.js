var rundark = function () {
	if (typeof (localStorage.setting) !== "undefined") {
		var darkmode = JSON.parse(localStorage.setting)['dark'];	//0为不启用暗模式，1为启用暗模式，2为启用随时间变化的暗模式
		if (darkmode === 0)
			$("*[class!=no-dark]").removeClass("text-light bg-dark");
		if (darkmode === 1)
			$("*[class!=no-dark]").addClass("text-light bg-dark");
		if (darkmode === 2) {
			//先运行一遍
			var hour = (new Date()).getHours();
			if (hour < 7 || hour >= 21)
				$("*[class!=no-dark]").addClass("text-light bg-dark");
			else
				$("*[class!=no-dark]").removeClass("text-light bg-dark");

			setInterval(function () {
				var hour = (new Date()).getHours();
				if (hour < 7 || hour >= 21)
					$("*[class!=no-dark]").addClass("text-light bg-dark");
				else
					$("*[class!=no-dark]").removeClass("text-light bg-dark");
			}, 30000);	//每30s检查一次时间
		}
	} else {	//默认启用暗主题
		$("*[class!=no-dark]").addClass("text-light bg-dark");
	}
}

if (typeof (Setting) === "undefined")
	Setting = {};
Setting.dark = {
	mode: function () {
		if (typeof (localStorage.setting) !== "undefined") {
			var darkmode = JSON.parse(localStorage.setting)['dark'];
			if (typeof (darkmode) !== "undefined")
				return darkmode;
		} else
			return 1;
	}(),

	set: function (mode) {
		if (typeof (localStorage.setting) !== "undefined") {
			var data = JSON.parse(localStorage.setting);
			data.dark = mode;
			localStorage.setting = JSON.stringify(data);
		} else {
			var data = { dark: mode };
			localStorage.setting = JSON.stringify(data);
		}
		rundark();
		return mode;
	}
};

$(function () {
	rundark();
});
