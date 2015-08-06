$(function(){
	var Slider = (function(){
		var pb = {}

		pb.el = $('.Slider');
		pb.items = {
			panel: pb.el.find('li')
		}

		//Variables necesarias
		var sliderInterval
		var currentSlider = 0
		var nextSlider = 1
		var lengthSlider = pb.items.panel.length

		pb.init = function(settings){
			this.settings = settings || {duration: 3000}
			var output = ''

			//Activamos el slider
			SliderInit();

			for(var i = 0; i < lengthSlider; i++){
				if (i == 0){
					output += '<li class="Slide__indicator active"></li>'
				}
				else{
					output += '<li class="Slide__indicator"></li>';
				}
			}

			//Controles del slider
			$('#Slider__controls').html(output).on('click', 'li', function(){
				var $this = $(this)
				if (currentSlider !== $this.index()){
					changePanel($this.index())
				}
			});
		}

		var SliderInit = function(){
			sliderInterval = setInterval(pb.startSlider, pb.settings.duration)
		}

		pb.startSlider = function(){
			var panels = pb.items.panel
			var controls = $('#Slider__controls li')

			if (nextSlider >= lengthSlider) {
				nextSlider = 0
				currentSlider = lengthSlider-1
			}
			//Efectos
			controls.removeClass('active').eq(nextSlider).addClass('active')
			panels.eq(currentSlider).fadeOut('slow')
			panels.eq(nextSlider).fadeIn('slow')

			//Actualizamos datos
			currentSlider = nextSlider
			nextSlider += 1
		}

		//Controles del slider
		var changePanel = function(id){
			clearInterval(sliderInterval)

			var panels = pb.items.panel
				controls = $('#Slider__controls li')
			if (id >= lengthSlider){
				id = 0
			}else if (id < 0){
				id = lengthSlider - 1
			}

			//Efectos
			controls.removeClass('active').eq(id).addClass('active')
			panels.eq(currentSlider).fadeOut('slow')
			panels.eq(id).fadeIn('slow')

			//Actualizamos datos
			currentSlider = id
			nextSlider = id + 1

			//Se reactiva el intervalo
			SliderInit()
		}

		return pb
	}());
	Slider.init({duration: 10000})
});
