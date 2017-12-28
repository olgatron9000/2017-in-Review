(function () {
	var $ = function(id) { return document.getElementById(id); };
	var lastList = null;
	var lastImage = null;
	var currentlyMoving = false;

	window.onload = function() {
		createCharts();
		attachEmotions();
		setInterval(animateGhost, 1500);
	}

	function checkVisible(elm) {
  		var rect = elm.getBoundingClientRect();
  		var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  		return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
	}

	function animateGhost() {
		if(checkVisible($("ghost")) && currentlyMoving == false) {
			currentlyMoving = true;
		    var map                 = Snap($("svg-doc"));
		    var ghost          		= map.select("#ghost");
		    var ghostbbox       	= ghost.getBBox();
		    var flight_path 		= map.path("M25.9,33.4c0,0,290.3,15.5,298.5,56.4S118.7,136.5,76,161.2c-63.7,36.8,166.3,85.4,287,64.4").attr({ 'fill': 'none', 'stroke': 'none'});
		    var flight_path_length  = Snap.path.getTotalLength(flight_path);
		    var last_point          = flight_path.getPointAtLength(flight_path_length);
		    Snap.animate(0, flight_path_length, function( step ) {
		                    moveToPoint = Snap.path.getPointAtLength( flight_path, step );
		                    x = moveToPoint.x - (ghostbbox.width/2);
		                    y = moveToPoint.y - (ghostbbox.height/2);
		                    ghost.transform('translate(' + x + ',' + y + ')');
		                }, 8000, mina.easeout, function() {
							currentlyMoving = false;
		                });
		}
	};
	// Creates the three charts that are displayed using charts.js
	function createCharts() {
		// Type of Listing bar chart
		var first = $("firstChart");
		var myChart = new Chart(first, {
		    type: 'line',
		    data: {
		        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		        datasets: [{
		            label: '# of friends made',
		            data: [8, 11, 7, 13, 13, 23, 26, 9, 16, 14, 1, 7],
		            pointBackgroundColor: [
		                'rgba(54, 100, 235, 1)',
		                'rgba(54, 162, 256, 1)',
		                'rgba(54, 100, 235, 1)',
		                'rgba(54, 162, 256, 1)',
		                'rgba(54, 100, 235, 1)',
		                'rgba(54, 162, 256, 1)',
		                'rgba(54, 100, 235, 1)',
		                'rgba(54, 162, 256, 1)',
		                'rgba(54, 100, 235, 1)',
		                'rgba(54, 162, 256, 1)',
		                'rgba(54, 100, 235, 1)',
		                'rgba(54, 162, 256, 1)',
		            ],
		            borderColor: 'rgba(0, 0, 0, 1)',
		            backgroundColor: 'rgba(0, 0, 0, 0)'
		        }]
		    },
		    options: {
		    	responsive: false,
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }],
		            xAxes: [{
	        			beginAtZero: true,
	        			ticks: {
				            stepSize: 1,
				            min: 0,
				            autoSkip: false
			        	}	
		    		}],
		        },
		        legend: {
		            display: false
		        }
		    }
		});
		var second = $("secondChart");
		var myDoughnutChart = new Chart(second, {
    		type: "doughnut",
   			data: {
   				labels: ["Like", "Love", "Laugh", "Cry", "Wow", "Angry"],
		        datasets: [{
		            data: [2575, 395, 356, 130, 101, 11],
		            backgroundColor: [
		            	"rgba(54, 162, 235, 1)",
		                "rgba(255, 99, 132, 1)",
		                "rgba(255, 206, 86, 1)",
		                "rgba(75, 192, 192, 1)",
		                "rgba(199, 111, 247, 1)",
		                "rgba(0, 0, 0, 1)",
		            ],
		            borderWidth: 1
		        }]
   			},
    		options: {
		    	responsive: false,
		    }
		});
		var third = $("thirdChart");
		var myBarChart = new Chart(third, {
    		type: "bar",
   			data: {
   				labels: ["Wholesome Memes", "Christine Betts", "Natalie Andreeva", "Dan Radion", "Shanti Camper Singh", "Patty Popp"],
		        datasets: [{
		            data: [156, 115, 84, 75, 72, 58],
		            backgroundColor: [
		            	"rgba(54, 162, 235, 1)",
		                "rgba(255, 99, 132, 1)",
		                "rgba(255, 206, 86, 1)",
		                "rgba(75, 192, 192, 1)",
		                "rgba(199, 111, 247, 1)",
		                "rgba(252, 141, 233, 1)",
		            ],
		            borderWidth: 1
		        }]
   			},
    		options: {
		    	responsive: false,
		    	legend: {
		            display: false
		        },
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }],
		            xAxes: [{
	        			beginAtZero: true,
	        			ticks: {
				            stepSize: 1,
				            min: 0,
				            autoSkip: false
			        	}	
		    		}],
		        }
		    }
		});
		setTimeout(hideLoadScreen, 3000);
	}

	function hideLoadScreen() {
		$("loader").classList.add("fadeOut"); 
	}

	function attachEmotions() {
		var allReactions = ["like", "love", "laugh", "wow", "cry", "angry"];
		for (var i = 0; i < allReactions.length; i++) {
			var reaction = allReactions[i];
			$(reaction).onclick = function() {
				var image = String(this.getAttribute("id"));
				var list = String(this.getAttribute("id")) + "list";
				$(list).classList.toggle("hidden");
				$(image).classList.toggle("active");
				if (lastList != null) {
					if (lastList != list) {
						$(lastList).classList.add("hidden");
						$(lastImage).classList.remove("active");
					}
				}
				lastList = list;
				lastImage = image;
			}
		}
	}

	// to get all the posts I've done since Jan 1st, 2017
	//me/posts?limit=55&since=1483257601
	// to get the reactions from a post
	//POST_ID?fields=reactions.type(LIKE).summary(total_count).limit(0).as(like),reactions.type(LOVE).summary(total_count).limit(0).as(love),reactions.type(WOW).summary(total_count).limit(0).as(wow),reactions.type(HAHA).summary(total_count).limit(0).as(haha),reactions.type(SAD).summary(total_count).limit(0).as(sad),reactions.type(ANGRY).summary(total_count).limit(0).as(angry)
}());

