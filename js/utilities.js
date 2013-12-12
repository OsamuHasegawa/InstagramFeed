function viewInstaFeed(target, tagName) {
	var feed = new Instafeed({
		target: target,
		get: 'tagged',
		tagName: tagName,
		clientId: 'a934e438a6ad42019ccc14e7889111d7',
		limit: '60',
		resolution: 'standard_resolution',
		template: '<article class="row"><div class="col-md-7"><header><h3>{{caption}}</h3></header><div class="media"><img class="media-object img-thumbnail" src="{{model.user.profile_picture}}" /><div class="media-body"><dl><dt>投稿者ID</dt><dd>{{model.user.username}}</dd><dt>投稿者名</dt><dd>{{model.user.full_name}}</dd><dt>投稿時間</dt><dd class="toLocaltime">{{model.created_time}}</dd><dt>場所</dt><dd class="imgLocation">{{model.location.name}}</dd><dt>ハッシュタグ</dt><dd>{{model.tags}}</dd></dl></div></div></div><div class="col-md-5"><a href="{{link}}"><img class="img-responsive" src="{{image}}" /></a></div></article><hr>',
		after:	function() {
					$('.toLocaltime').localtime();
					$('.imgLocation:empty').prev().remove();
				}
	});
	feed.run();
}

function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i <hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

(function() {
	(function($) {
		return $.fn.localtime = function() {
			
			var fmtDate, fmtZero;
			
			fmtZero = function(str) {
				return ('0' + str).slice(-2);
			};
			
			fmtDate = function(d) {
				var hour, meridiem;
				hour = d.getHours();
				if (hour < 12) {
					meridiem = "AM";
				} else {
					meridiem = "PM";
				}
			
				if (hour === 0) { hour = 12; }
			
				if (hour > 12) { hour = hour - 12; }
			
				//return hour + ":" + fmtZero(d.getMinutes()) + " " + meridiem + " " + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
				return d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate() + " " + meridiem + " " + hour + ":" + fmtZero(d.getMinutes());
			};
		
			return this.each(function() {
				var tagText;
				tagText = $(this).html() * 1000;
				$(this).html(fmtDate(new Date(tagText)));
				return $(this).attr("title", tagText);
			});
		};
	})(jQuery);
}).call(this);