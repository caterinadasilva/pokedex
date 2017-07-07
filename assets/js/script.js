$(document).ready(function($) {
	$.ajax({
		url: 'http://pokeapi.co/api/v2/pokemon/',
		type: 'GET',
		dataType: 'JSON',
		data: {'limit': '12'}
	})
	.done(function(pokemones) {
		console.log("success");
		console.log(pokemones);
		mostrarPkmn(pokemones);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

	function mostrarPkmn(e) {
		e.results.forEach(function(elemento) {
			var nombre = elemento.name;
			var pkmnURL = elemento.url;

			var card = $('<div>').addClass('card');
			var cardCont2 = $('<div>').addClass('card-content');
			var cardCont1 = $('<div>').addClass('card-stacked');
			card.addClass('col');
			card.addClass('small');
			var pkmnName = $('<span>').addClass('card-title').text(nombre);

			//console.log(elemento);

			// AJAX para el Pokémon solito
			$.ajax({
				url: pkmnURL,
				type: 'GET',
				dataType: 'JSON'
			})
			.done(function(pokemon) {
				console.log("success");
				console.log(pokemon);
				imagenId(pokemon);
				cardCont2.append(pkmnName);
				cardCont1.append(cardCont2);
				card.append(cardCont1);
				$('#pokedex').append(card);
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});

			function imagenId(e) {
				var pkmnID = e.id;
				var sprite = $('<img>').attr({
					'src':'http://pokeapi.co/media/img/'+ pkmnID +'.png',
					'alt': nombre
				});
				var cardImg = $('<div>').addClass('card-image');
				sprite.appendTo(cardImg);
				card.append(cardImg);
			}
			// mostrar pokemones

		});
	}
});